"""
Django admin configuration for accounts app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, UserRole, ClientProfile, StaffProfile, AuditLog


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin interface for User model."""
    list_display = ['email', 'is_active', 'is_staff', 'last_login', 'date_joined']
    list_filter = ['is_active', 'is_staff', 'date_joined']
    search_fields = ['email']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('two_factor_enabled', 'two_factor_secret')}),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    """Admin interface for Role model."""
    list_display = ['code', 'name', 'description']
    list_filter = ['code']
    search_fields = ['name', 'code']


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    """Admin interface for UserRole model."""
    list_display = ['user', 'role', 'assigned_at']
    list_filter = ['role', 'assigned_at']
    search_fields = ['user__email']


@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    """Admin interface for ClientProfile model."""
    list_display = ['first_name', 'last_name', 'email', 'phone', 'created_at']
    list_filter = ['created_at', 'nationality']
    search_fields = ['first_name', 'last_name', 'user__email', 'phone']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    def email(self, obj):
        return obj.user.email
    email.short_description = 'Email'


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    """Admin interface for StaffProfile model."""
    list_display = ['title', 'email', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'user__email']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    def email(self, obj):
        return obj.user.email
    email.short_description = 'Email'


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """Admin interface for AuditLog model."""
    list_display = ['action', 'entity_type', 'entity_id', 'actor', 'created_at', 'ip_address']
    list_filter = ['action', 'entity_type', 'created_at']
    search_fields = ['actor__email', 'entity_type']
    readonly_fields = ['id', 'created_at']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

