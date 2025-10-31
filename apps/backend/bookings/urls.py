"""Booking URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AvailabilitySlotViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'availability', AvailabilitySlotViewSet)
router.register(r'', BookingViewSet)

urlpatterns = [path('', include(router.urls))]

