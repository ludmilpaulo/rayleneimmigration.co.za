"""
Views for document management.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.utils import timezone
from rest_framework.views import APIView
import boto3
from django.conf import settings

from .models import Document, DocumentType
from .serializers import DocumentSerializer, DocumentCreateSerializer, DocumentReviewSerializer, DocumentTypeSerializer
from accounts.models import AuditLog


class DocumentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for document types."""
    queryset = DocumentType.objects.filter(is_active=True)
    serializer_class = DocumentTypeSerializer
    permission_classes = [IsAuthenticated]


class DocumentViewSet(viewsets.ModelViewSet):
    """View set for documents."""
    queryset = Document.objects.all()  # Required for router basename
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'document_type', 'application']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filter documents based on user."""
        user = self.request.user
        is_staff = user.is_staff or user.user_roles.filter(role__code__in=['ADMIN', 'CONSULTANT', 'FINANCE']).exists()
        
        if is_staff:
            return Document.objects.select_related('application', 'document_type', 'uploaded_by')
        else:
            return Document.objects.filter(application__client=user).select_related('application', 'document_type')
    
    def get_serializer_class(self):
        """Return appropriate serializer."""
        if self.action == 'create':
            return DocumentCreateSerializer
        elif self.action == 'review':
            return DocumentReviewSerializer
        return DocumentSerializer
    
    def perform_create(self, serializer):
        """Create document with uploaded_by set to current user."""
        serializer.save(uploaded_by=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def review(self, request, pk=None):
        """Review document (approve/reject)."""
        document = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        old_status = document.status
        new_status = serializer.validated_data['status']
        remarks = serializer.validated_data.get('remarks', '')
        
        # Update document
        document.status = new_status
        document.remarks = remarks
        document.reviewed_at = timezone.now()
        document.save()
        
        # Create audit log
        AuditLog.objects.create(
            actor=request.user,
            action='REVIEW_DOCUMENT',
            entity_type='Document',
            entity_id=document.id,
            meta={'status': new_status, 'remarks': remarks},
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return Response(DocumentSerializer(document).data)


class PresignView(APIView):
    """Generate pre-signed S3 URL for direct upload."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Generate pre-signed URL."""
        filename = request.data.get('filename')
        content_type = request.data.get('content_type')
        
        if not filename or not content_type:
            return Response(
                {'error': 'filename and content_type are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate pre-signed URL
        s3_client = boto3.client(
            's3',
            endpoint_url=getattr(settings, 'AWS_S3_ENDPOINT_URL', None),
            aws_access_key_id=getattr(settings, 'AWS_ACCESS_KEY_ID', ''),
            aws_secret_access_key=getattr(settings, 'AWS_SECRET_ACCESS_KEY', '')
        )
        
        key = f'documents/{request.user.id}/{filename}'
        
        try:
            url = s3_client.generate_presigned_url(
                'put_object',
                Params={
                    'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                    'Key': key,
                    'ContentType': content_type,
                },
                ExpiresIn=3600  # 1 hour
            )
            
            return Response({
                'url': url,
                'key': key,
                'expires_in': 3600
            })
        except Exception as e:
            return Response(
                {'error': f'Failed to generate presigned URL: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

