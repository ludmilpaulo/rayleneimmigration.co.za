"""Communication serializers."""
from rest_framework import serializers
from .models import Message, Notification, Template


class MessageSerializer(serializers.ModelSerializer):
    from_email = serializers.EmailField(source='from_user.email', read_only=True)
    to_email = serializers.EmailField(source='to_user.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Message
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'

