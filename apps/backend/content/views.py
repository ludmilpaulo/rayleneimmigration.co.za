"""Content views."""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BlogPost, Page
from .serializers import BlogPostSerializer, BlogPostListSerializer, PageSerializer, PageListSerializer


class PageViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for pages with translations."""
    queryset = Page.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PageListSerializer
        return PageSerializer
    
    def get_serializer_context(self):
        """Add locale to context."""
        context = super().get_serializer_context()
        locale = self.request.query_params.get('locale', 'en')
        context['locale'] = locale
        return context
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a single page with translated content."""
        instance = self.get_object()
        locale = request.query_params.get('locale', 'en')
        
        serializer = self.get_serializer(instance, context={'locale': locale})
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for blog posts."""
    queryset = BlogPost.objects.filter(published_at__isnull=False)
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer

