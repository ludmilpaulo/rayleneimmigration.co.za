"""Content models."""
import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


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

