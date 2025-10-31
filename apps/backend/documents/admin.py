"""
Django admin for documents app.
"""
from django.contrib import admin
from .models import Document, DocumentType


@admin.register(DocumentType)
class DocumentTypeAdmin(admin.ModelAdmin):
    """Admin for document types."""
    list_display = ['name', 'code', 'is_required', 'max_size_mb', 'is_active', 'created_at']
    list_filter = ['is_required', 'is_active', 'created_at']
    search_fields = ['name', 'code']


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """Admin for documents."""
    list_display = ['document_type', 'application', 'status', 'uploaded_by_email', 
                    'created_at', 'reviewed_at']
    list_filter = ['status', 'document_type', 'created_at']
    search_fields = ['filename', 'application__dha_ref']
    readonly_fields = ['id', 'created_at', 'updated_at', 'reviewed_at']
    
    def uploaded_by_email(self, obj):
        return obj.uploaded_by.email if obj.uploaded_by else '-'
    uploaded_by_email.short_description = 'Uploaded By'

