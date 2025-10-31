"""Booking serializers."""
from rest_framework import serializers
from .models import Booking, AvailabilitySlot


class AvailabilitySlotSerializer(serializers.ModelSerializer):
    staff_email = serializers.EmailField(source='staff.email', read_only=True)
    
    class Meta:
        model = AvailabilitySlot
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    client_email = serializers.EmailField(source='client.email', read_only=True)
    staff_email = serializers.EmailField(source='staff.email', read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['slot', 'notes']

