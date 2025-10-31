"""Billing models."""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils import timezone as tz

User = get_user_model()


class Invoice(models.Model):
    """Invoices."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    application = models.ForeignKey('applications.Application', on_delete=models.SET_NULL, null=True, blank=True)
    number = models.CharField(max_length=50, unique=True)
    items = models.JSONField(default=list)  # [{'description': '', 'amount': 0}]
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='ZAR')
    status = models.CharField(max_length=20, choices=[
        ('DUE', 'Due'),
        ('PAID', 'Paid'),
        ('VOID', 'Void'),
    ], default='DUE')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(default=tz.now)

    class Meta:
        db_table = 'invoices'
        ordering = ['-created_at']

    def __str__(self):
        return self.number


class Payment(models.Model):
    """Payments."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    provider = models.CharField(max_length=20, choices=[
        ('STRIPE', 'Stripe'),
        ('PAYSTACK', 'Paystack'),
        ('SNAPSCAN', 'SnapScan'),
    ])
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='ZAR')
    external_id = models.CharField(max_length=255)
    status = models.CharField(max_length=20)
    receipt_url = models.URLField(blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=tz.now)

    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.provider} - {self.amount}'

