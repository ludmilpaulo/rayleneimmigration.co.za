"""Communication models."""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class Message(models.Model):
    """Messages between users."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey('applications.Application', on_delete=models.CASCADE, related_name='messages')
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    to_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_messages')
    body = models.TextField()
    attachments = models.JSONField(default=list)
    is_internal = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'messages'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.from_user.email} → {self.to_user.email if self.to_user else "all"}'


class Notification(models.Model):
    """Notifications sent to users."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    channel = models.CharField(max_length=20, choices=[
        ('EMAIL', 'Email'),
        ('SMS', 'SMS'),
        ('WHATSAPP', 'WhatsApp'),
        ('INAPP', 'In-App'),
    ])
    template_code = models.CharField(max_length=50)
    payload = models.JSONField(default=dict)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('SENT', 'Sent'),
        ('FAILED', 'Failed'),
    ], default='PENDING')
    sent_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.email} - {self.template_code}'


class Template(models.Model):
    """Email/letter templates."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    kind = models.CharField(max_length=20, choices=[
        ('EMAIL', 'Email'),
        ('LETTER', 'Letter'),
        ('PDF', 'PDF'),
    ])
    locale = models.CharField(max_length=10, default='en')
    subject = models.CharField(max_length=200, blank=True)
    body_html = models.TextField(blank=True)
    body_text = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'templates'
        unique_together = ['code', 'locale']

    def __str__(self):
        return f'{self.name} ({self.locale})'

