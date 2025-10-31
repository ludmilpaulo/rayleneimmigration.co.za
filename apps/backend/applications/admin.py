"""
Django admin for applications app.
"""
from django.contrib import admin
from .models import Application, ApplicationType, StatusHistory, Task


@admin.register(ApplicationType)
class ApplicationTypeAdmin(admin.ModelAdmin):
    """Admin for application types."""
    list_display = ['name', 'code', 'country', 'base_price', 'is_active', 'created_at']
    list_filter = ['country', 'is_active', 'created_at']
    search_fields = ['name', 'code']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    """Admin for applications."""
    list_display = ['application_type', 'client_email', 'status', 'priority', 
                    'assigned_to_email', 'created_at', 'submitted_at']
    list_filter = ['status', 'priority', 'application_type', 'created_at']
    search_fields = ['client__email', 'dha_ref', 'notes']
    readonly_fields = ['id', 'created_at', 'updated_at', 'submitted_at']
    raw_id_fields = ['client', 'assigned_to']
    
    def client_email(self, obj):
        return obj.client.email
    client_email.short_description = 'Client'
    
    def assigned_to_email(self, obj):
        return obj.assigned_to.email if obj.assigned_to else '-'
    assigned_to_email.short_description = 'Assigned To'


@admin.register(StatusHistory)
class StatusHistoryAdmin(admin.ModelAdmin):
    """Admin for status history."""
    list_display = ['application', 'from_status', 'to_status', 'changed_by', 'created_at']
    list_filter = ['to_status', 'created_at']
    search_fields = ['application__dha_ref']
    readonly_fields = ['id', 'created_at']
    
    def has_add_permission(self, request):
        return False
    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """Admin for tasks."""
    list_display = ['title', 'application', 'status', 'assigned_to_email', 'due_date', 'created_at']
    list_filter = ['status', 'due_date', 'created_at']
    search_fields = ['title', 'application__dha_ref']
    raw_id_fields = ['application', 'assigned_to']
    
    def assigned_to_email(self, obj):
        return obj.assigned_to.email if obj.assigned_to else '-'
    assigned_to_email.short_description = 'Assigned To'

