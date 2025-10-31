"""Communication views."""
from rest_framework import viewsets, permissions
from .models import Message, Notification, Template
from .serializers import MessageSerializer, NotificationSerializer, TemplateSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """View set for messages."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(from_user=user) | Message.objects.filter(to_user=user)
    
    serializer_class = MessageSerializer


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for notifications."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    serializer_class = NotificationSerializer


class TemplateViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for templates."""
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

