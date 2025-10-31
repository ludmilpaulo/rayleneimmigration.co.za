"""Communication URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet, NotificationViewSet, TemplateViewSet

router = DefaultRouter()
router.register(r'messages', MessageViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'templates', TemplateViewSet)

urlpatterns = [path('', include(router.urls))]

