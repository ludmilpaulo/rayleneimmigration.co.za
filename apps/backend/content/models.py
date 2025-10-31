"""Content models."""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import RegexValidator

User = get_user_model()

# Supported languages
SUPPORTED_LANGUAGES = [
    ('en', 'English'),
    ('pt', 'Portuguese'),
    ('fr', 'French'),
]


class Page(models.Model):
    """Pages that contain translatable content."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200, help_text="Internal title for admin")
    description = models.TextField(blank=True, help_text="Internal description")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pages'
        ordering = ['slug']

    def __str__(self):
        return self.title


class PageContent(models.Model):
    """Translated content for pages."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='content')
    locale = models.CharField(max_length=5, choices=SUPPORTED_LANGUAGES, db_index=True)
    
    # Content fields
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    meta_description = models.TextField(blank=True, help_text="For SEO")
    meta_keywords = models.CharField(max_length=300, blank=True, help_text="Comma-separated")
    
    # Main content (can be HTML)
    body = models.TextField(blank=True, help_text="Main content, can contain HTML")
    
    # Additional JSON data for flexible content
    extra_data = models.JSONField(default=dict, blank=True, help_text="For hero sections, features, etc.")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'page_content'
        unique_together = ['page', 'locale']
        ordering = ['page__slug', 'locale']

    def __str__(self):
        return f"{self.page.title} - {self.get_locale_display()}"


class BlogPost(models.Model):
    """Blog posts."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    excerpt = models.TextField(blank=True)
    body_html = models.TextField()
    cover_url = models.URLField(blank=True)
    tags = models.JSONField(default=list)
    published_at = models.DateTimeField(null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'blog_posts'
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

