"""
Views for authentication and user management.
"""
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from django.utils import timezone
from .serializers import (
    UserSerializer, RegistrationSerializer, ChangePasswordSerializer,
    ClientProfileSerializer, StaffProfileSerializer, TwoFASetupSerializer, TwoFAVerifySerializer
)
from .models import ClientProfile, StaffProfile

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """User registration endpoint."""
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """Create user and return profile."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Return user profile
        profile = user.client_profile
        return Response(
            ClientProfileSerializer(profile).data,
            status=status.HTTP_201_CREATED
        )


class MeView(generics.RetrieveUpdateAPIView):
    """Get/Update current user profile."""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Return current user."""
        return self.request.user

    def update(self, request, *args, **kwargs):
        """Update user or profile."""
        user = self.request.user
        
        # Check if updating client or staff profile
        if hasattr(user, 'client_profile'):
            profile = user.client_profile
            serializer = ClientProfileSerializer(profile, data=request.data, partial=True)
        elif hasattr(user, 'staff_profile'):
            profile = user.staff_profile
            serializer = StaffProfileSerializer(profile, data=request.data, partial=True)
        else:
            # Update user fields
            serializer = self.get_serializer(user, data=request.data, partial=True)
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    """Change user password."""
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'message': 'Password changed successfully.'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_2fa(request):
    """Verify 2FA code and issue JWT."""
    # TODO: Implement TOTP verification
    # For now, return placeholder
    return Response({'message': '2FA verification not yet implemented.'})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def setup_2fa(request):
    """Generate 2FA secret and QR code."""
    # TODO: Implement TOTP setup
    # For now, return placeholder
    return Response({'message': '2FA setup not yet implemented.'})


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token obtain view with last_login update."""
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Update last_login
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken(request.data.get('refresh'))
            user = User.objects.get(id=refresh.payload['user_id'])
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])
        return response


# Re-export JWT views with custom names
TokenObtainPairView = CustomTokenObtainPairView

