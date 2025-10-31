"""
Serializers for applications.
"""
from rest_framework import serializers
from .models import Application, ApplicationType, StatusHistory, Task


class ApplicationTypeSerializer(serializers.ModelSerializer):
    """Serializer for application type."""
    
    class Meta:
        model = ApplicationType
        fields = ['id', 'code', 'name', 'slug', 'country', 'description', 
                  'base_price', 'doc_requirements', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']


class StatusHistorySerializer(serializers.ModelSerializer):
    """Serializer for status history."""
    changed_by_email = serializers.EmailField(source='changed_by.email', read_only=True)
    
    class Meta:
        model = StatusHistory
        fields = ['id', 'from_status', 'to_status', 'note', 'changed_by_email', 'created_at']
        read_only_fields = ['id', 'created_at']


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for tasks."""
    assigned_to_email = serializers.EmailField(source='assigned_to.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'assigned_to_email', 
                  'due_date', 'completed_at', 'created_at']
        read_only_fields = ['id', 'completed_at', 'created_at']


class TaskCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating tasks."""
    
    class Meta:
        model = Task
        fields = ['title', 'description', 'due_date', 'assigned_to']


class ApplicationSerializer(serializers.ModelSerializer):
    """Serializer for application."""
    client_email = serializers.EmailField(source='client.email', read_only=True)
    assigned_to_email = serializers.EmailField(source='assigned_to.email', read_only=True, allow_null=True)
    application_type_name = serializers.CharField(source='application_type.name', read_only=True)
    
    class Meta:
        model = Application
        fields = ['id', 'client_email', 'application_type', 'application_type_name',
                  'assigned_to', 'assigned_to_email', 'status', 'priority', 'country',
                  'notes', 'internal_notes', 'dha_ref', 'created_at', 'updated_at',
                  'submitted_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'submitted_at']


class ApplicationDetailSerializer(ApplicationSerializer):
    """Detailed application serializer with related data."""
    status_history = StatusHistorySerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta(ApplicationSerializer.Meta):
        fields = ApplicationSerializer.Meta.fields + ['status_history', 'tasks']


class ApplicationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating applications."""
    
    class Meta:
        model = Application
        fields = ['application_type', 'country', 'notes']


class ApplicationStatusUpdateSerializer(serializers.Serializer):
    """Serializer for updating application status."""
    status = serializers.ChoiceField(choices=Application.STATUS_CHOICES)
    note = serializers.CharField(required=False, allow_blank=True)

