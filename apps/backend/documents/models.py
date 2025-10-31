"""
Document management models.
"""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class DocumentType(models.Model):
    """Types of documents required for applications."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    mime_types = models.JSONField(default=list, help_text='Allowed MIME types')
    is_required = models.BooleanField(default=True)
    max_size_mb = models.PositiveIntegerField(default=10, help_text='Maximum file size in MB')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'document_types'
        ordering = ['name']

    def __str__(self):
        return self.name


class Document(models.Model):
    """Uploaded documents."""
    
    STATUS_CHOICES = [
        ('RECEIVED', 'Received'),
        ('REVIEWING', 'Reviewing'),
        ('NEEDS_REUPLOAD', 'Needs Re-upload'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey('applications.Application', on_delete=models.CASCADE, related_name='documents')
    document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT, related_name='documents')
    
    # File information
    url = models.URLField(help_text='S3 or storage URL')
    filename = models.CharField(max_length=255)
    size = models.PositiveIntegerField(help_text='File size in bytes')
    mime_type = models.CharField(max_length=100)
    
    # Review information
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='RECEIVED')
    remarks = models.TextField(blank=True, help_text='Review comments')
    
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_documents')
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'documents'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['application', 'status']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f'{self.document_type.name} - {self.application} ({self.status})'

