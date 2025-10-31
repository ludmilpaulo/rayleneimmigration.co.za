"""
URLs for authentication and user management.
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, MeView, change_password, verify_2fa, setup_2fa,
    CustomTokenObtainPairView
)

app_name = 'accounts'

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    
    # User profile
    path('', MeView.as_view(), name='me'),
    path('change-password/', change_password, name='change-password'),
    
    # 2FA
    path('2fa/setup/', setup_2fa, name='2fa-setup'),
    path('2fa/verify/', verify_2fa, name='2fa-verify'),
]

