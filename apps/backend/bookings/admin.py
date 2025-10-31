"""Booking admin."""
from django.contrib import admin
from .models import AvailabilitySlot, Booking


@admin.register(AvailabilitySlot)
class AvailabilitySlotAdmin(admin.ModelAdmin):
    list_display = ['staff', 'start', 'end', 'location', 'capacity']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['client', 'staff', 'status', 'created_at']
    list_filter = ['status', 'created_at']

