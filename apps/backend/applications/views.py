"""
Views for application management.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.utils import timezone

from .models import Application, ApplicationType, StatusHistory, Task
from .serializers import (
    ApplicationSerializer, ApplicationDetailSerializer, ApplicationCreateSerializer,
    ApplicationTypeSerializer, ApplicationStatusUpdateSerializer,
    TaskSerializer, TaskCreateSerializer
)
from accounts.models import AuditLog


class ApplicationTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for application types."""
    queryset = ApplicationType.objects.filter(is_active=True)
    serializer_class = ApplicationTypeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'


class ApplicationViewSet(viewsets.ModelViewSet):
    """View set for applications."""
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'application_type', 'assigned_to']
    search_fields = ['notes', 'internal_notes', 'dha_ref']
    ordering_fields = ['created_at', 'updated_at', 'submitted_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filter applications based on user role."""
        user = self.request.user
        queryset = Application.objects.select_related('client', 'application_type', 'assigned_to')
        
        # Check if user is staff/admin
        is_staff = user.is_staff or user.user_roles.filter(role__code__in=['ADMIN', 'CONSULTANT', 'FINANCE', 'SUPPORT']).exists()
        
        if is_staff:
            # Staff can see all applications or filtered
            return queryset
        else:
            # Clients only see their own applications
            return queryset.filter(client=user)
    
    def get_serializer_class(self):
        """Return appropriate serializer."""
        if self.action == 'create':
            return ApplicationCreateSerializer
        elif self.action == 'retrieve':
            return ApplicationDetailSerializer
        elif self.action == 'update_status':
            return ApplicationStatusUpdateSerializer
        return ApplicationSerializer
    
    def perform_create(self, serializer):
        """Create application with client set to current user."""
        serializer.save(client=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update application status and create history entry."""
        application = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        old_status = application.status
        new_status = serializer.validated_data['status']
        note = serializer.validated_data.get('note', '')
        
        # Update application
        application.status = new_status
        if new_status == 'SUBMITTED' and not application.submitted_at:
            application.submitted_at = timezone.now()
        application.save()
        
        # Create status history
        StatusHistory.objects.create(
            application=application,
            from_status=old_status,
            to_status=new_status,
            note=note,
            changed_by=request.user
        )
        
        # Create audit log
        AuditLog.objects.create(
            actor=request.user,
            action='UPDATE_STATUS',
            entity_type='Application',
            entity_id=application.id,
            meta={'from': old_status, 'to': new_status, 'note': note},
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return Response(ApplicationDetailSerializer(application).data)
    
    @action(detail=True, methods=['get'])
    def status_history(self, request, pk=None):
        """Get status history for application."""
        application = self.get_object()
        history = application.status_history.all()
        serializer = StatusHistorySerializer(history, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def tasks(self, request, pk=None):
        """Create task for application."""
        application = self.get_object()
        serializer = TaskCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(application=application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskViewSet(viewsets.ModelViewSet):
    """View set for tasks."""
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'assigned_to', 'application']
    ordering_fields = ['due_date', 'created_at']
    ordering = ['due_date', 'created_at']
    
    def get_queryset(self):
        """Filter tasks based on user."""
        user = self.request.user
        is_staff = user.is_staff or user.user_roles.filter(role__code__in=['ADMIN', 'CONSULTANT']).exists()
        
        if is_staff:
            return Task.objects.all()
        else:
            # Clients only see tasks for their applications
            return Task.objects.filter(application__client=user)
    
    def perform_create(self, serializer):
        """Create task with application."""
        serializer.save()
    
    @action(detail=True, methods=['patch'])
    def complete(self, request, pk=None):
        """Mark task as complete."""
        task = self.get_object()
        task.status = 'DONE'
        task.completed_at = timezone.now()
        task.save()
        return Response(TaskSerializer(task).data)

