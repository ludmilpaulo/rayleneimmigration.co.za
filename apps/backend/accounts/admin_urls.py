"""
Admin-specific URLs (e.g., user management).
"""
from django.urls import path
from .views import MeView

app_name = 'accounts_admin'

urlpatterns = [
    # Add admin-specific views here if needed
]

