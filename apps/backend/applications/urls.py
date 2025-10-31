"""
URLs for application management.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, ApplicationTypeViewSet, TaskViewSet

app_name = 'applications'

router = DefaultRouter()
router.register(r'types', ApplicationTypeViewSet, basename='application-type')
router.register(r'', ApplicationViewSet, basename='application')
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
]

