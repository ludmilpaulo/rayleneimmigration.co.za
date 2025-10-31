"""Content serializers."""
from rest_framework import serializers
from .models import BlogPost, Page, PageContent


class PageContentSerializer(serializers.ModelSerializer):
    """Serializer for page content."""
    class Meta:
        model = PageContent
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


class PageSerializer(serializers.ModelSerializer):
    """Serializer for pages."""
    content = serializers.SerializerMethodField()
    
    class Meta:
        model = Page
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_content(self, obj):
        """Return content for the requested locale."""
        locale = self.context.get('locale', 'en')
        try:
            page_content = obj.content.get(locale=locale, is_active=True)
            return PageContentSerializer(page_content).data
        except PageContent.DoesNotExist:
            # Fallback to English if translation not available
            try:
                page_content = obj.content.get(locale='en', is_active=True)
                return PageContentSerializer(page_content).data
            except PageContent.DoesNotExist:
                return None


class PageListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list view."""
    class Meta:
        model = Page
        fields = ['id', 'slug', 'title', 'is_active']


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

