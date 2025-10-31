"""Content admin."""
from django.contrib import admin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_at', 'created_at']
    prepopulated_fields = {'slug': ('title',)}

