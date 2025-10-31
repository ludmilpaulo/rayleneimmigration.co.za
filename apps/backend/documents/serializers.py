"""
Serializers for documents.
"""
from rest_framework import serializers
from .models import Document, DocumentType


class DocumentTypeSerializer(serializers.ModelSerializer):
    """Serializer for document type."""
    
    class Meta:
        model = DocumentType
        fields = ['id', 'code', 'name', 'description', 'mime_types', 
                  'is_required', 'max_size_mb', 'is_active']
        read_only_fields = ['id']


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for document."""
    document_type_name = serializers.CharField(source='document_type.name', read_only=True)
    uploaded_by_email = serializers.EmailField(source='uploaded_by.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Document
        fields = ['id', 'application', 'document_type', 'document_type_name',
                  'url', 'filename', 'size', 'mime_type', 'status', 'remarks',
                  'uploaded_by_email', 'created_at', 'updated_at', 'reviewed_at']
        read_only_fields = ['id', 'uploaded_by_email', 'created_at', 'updated_at', 'reviewed_at']


class DocumentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating documents."""
    
    class Meta:
        model = Document
        fields = ['document_type', 'url', 'filename', 'size', 'mime_type']


class DocumentReviewSerializer(serializers.Serializer):
    """Serializer for reviewing documents."""
    status = serializers.ChoiceField(choices=Document.STATUS_CHOICES)
    remarks = serializers.CharField(required=False, allow_blank=True)

