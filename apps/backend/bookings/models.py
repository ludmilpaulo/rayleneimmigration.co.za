"""Booking models."""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class AvailabilitySlot(models.Model):
    """Availability slots for staff."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff = models.ForeignKey(User, on_delete=models.CASCADE, related_name='availability_slots')
    start = models.DateTimeField()
    end = models.DateTimeField()
    location = models.CharField(max_length=20, choices=[('ONLINE', 'Online'), ('IN_PERSON', 'In Person')])
    capacity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'availability_slots'
        indexes = [models.Index(fields=['staff', 'start', 'end'])]

    def __str__(self):
        return f'{self.staff.email} - {self.start}'


class Booking(models.Model):
    """Consultation bookings."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    staff = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    slot = models.ForeignKey(AvailabilitySlot, on_delete=models.CASCADE, related_name='bookings')
    meeting_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
        ('COMPLETED', 'Completed'),
    ], default='PENDING')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'bookings'
        ordering = ['start']

    def __str__(self):
        return f'{self.client.email} - {self.staff.email}'

