"""Content views."""
from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer, BlogPostListSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for blog posts."""
    queryset = BlogPost.objects.filter(published_at__isnull=False)
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer

