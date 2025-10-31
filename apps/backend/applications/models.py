"""
Application management models.
"""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class ApplicationType(models.Model):
    """Types of immigration applications."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    country = models.CharField(max_length=100, default='South Africa')
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    doc_requirements = models.JSONField(default=list, help_text='List of required document types')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'application_types'
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.country})'


class Application(models.Model):
    """Immigration application."""
    
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('INTAKE', 'Intake'),
        ('IN_REVIEW', 'In Review'),
        ('DOCS_PENDING', 'Documents Pending'),
        ('READY_TO_SUBMIT', 'Ready to Submit'),
        ('SUBMITTED', 'Submitted'),
        ('DHA_PROCESSING', 'DHA Processing'),
        ('ADDITIONAL_INFO_REQUESTED', 'Additional Info Requested'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('CLOSED', 'Closed'),
    ]
    
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('NORMAL', 'Normal'),
        ('HIGH', 'High'),
        ('URGENT', 'Urgent'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    application_type = models.ForeignKey(ApplicationType, on_delete=models.PROTECT, related_name='applications')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_applications')
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='DRAFT')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='NORMAL')
    
    country = models.CharField(max_length=100)
    notes = models.TextField(blank=True)
    internal_notes = models.TextField(blank=True, help_text='Internal notes not visible to client')
    
    dha_ref = models.CharField(max_length=100, blank=True, help_text='Department of Home Affairs reference')
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'applications'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['client', 'status']),
            models.Index(fields=['assigned_to', 'status']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f'{self.application_type.name} - {self.client.email} ({self.status})'


class StatusHistory(models.Model):
    """Track application status changes."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='status_history')
    from_status = models.CharField(max_length=50, blank=True)
    to_status = models.CharField(max_length=50)
    note = models.TextField(blank=True)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='status_changes')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'status_history'
        ordering = ['-created_at']
        verbose_name_plural = 'Status histories'

    def __str__(self):
        return f'{self.application} - {self.from_status} → {self.to_status}'


class Task(models.Model):
    """Tasks related to applications."""
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done'),
        ('CANCELLED', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    due_date = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'tasks'
        ordering = ['due_date', 'created_at']

    def __str__(self):
        return f'{self.title} - {self.application}'

