"""Booking views."""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import Booking, AvailabilitySlot
from .serializers import AvailabilitySlotSerializer, BookingSerializer, BookingCreateSerializer


class AvailabilitySlotViewSet(ReadOnlyModelViewSet):
    """View set for availability slots."""
    queryset = AvailabilitySlot.objects.all()
    serializer_class = AvailabilitySlotSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['staff', 'location']


class BookingViewSet(viewsets.ModelViewSet):
    """View set for bookings."""
    queryset = Booking.objects.all()  # Required for router basename
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'staff', 'client']
    
    def get_queryset(self):
        user = self.request.user
        is_staff = user.is_staff
        if is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(client=user)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BookingCreateSerializer
        return BookingSerializer
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

