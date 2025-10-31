"""Content serializers."""
from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author_email = serializers.EmailField(source='author.email', read_only=True, allow_null=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


class BlogPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list view."""
    class Meta:
        model = BlogPost
        fields = ['id', 'slug', 'title', 'excerpt', 'cover_url', 'tags', 'published_at']

