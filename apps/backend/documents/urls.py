"""
URLs for document management.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, DocumentTypeViewSet, PresignView

app_name = 'documents'

router = DefaultRouter()
router.register(r'types', DocumentTypeViewSet, basename='document-type')
router.register(r'', DocumentViewSet, basename='document')

urlpatterns = [
    path('uploads/presign/', PresignView.as_view(), name='presign'),
    path('', include(router.urls)),
]

