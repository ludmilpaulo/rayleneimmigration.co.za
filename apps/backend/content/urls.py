"""Content URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, PageViewSet

router = DefaultRouter()
router.register(r'blog', BlogPostViewSet)
router.register(r'pages', PageViewSet)

urlpatterns = [path('', include(router.urls))]

