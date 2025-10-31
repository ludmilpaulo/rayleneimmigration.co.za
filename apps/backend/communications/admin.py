"""Communication admin."""
from django.contrib import admin
from .models import Message, Notification, Template


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'application', 'is_internal', 'created_at']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'channel', 'template_code', 'status', 'created_at']


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'kind', 'locale']

