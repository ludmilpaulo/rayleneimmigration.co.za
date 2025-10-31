"""
Serializers for user authentication and profiles.
"""
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Role, UserRole, ClientProfile, StaffProfile


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user model."""
    roles = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_staff', 'date_joined', 'last_login', 
                  'two_factor_enabled', 'roles']
        read_only_fields = ['id', 'date_joined', 'last_login']

    def get_roles(self, obj):
        """Get user roles."""
        return [ur.role.code for ur in obj.user_roles.select_related('role')]


class ClientProfileSerializer(serializers.ModelSerializer):
    """Serializer for client profile."""
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = ClientProfile
        fields = ['id', 'email', 'first_name', 'last_name', 'date_of_birth', 
                  'nationality', 'passport_no', 'phone', 'address', 'consent_flags',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'passport_no': {'write_only': True},
        }


class StaffProfileSerializer(serializers.ModelSerializer):
    """Serializer for staff profile."""
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = StaffProfile
        fields = ['id', 'email', 'title', 'bio', 'calendar_link', 'whatsapp_no',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True, required=False)
    last_name = serializers.CharField(write_only=True, required=False)
    phone = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm', 'first_name', 'last_name', 'phone']

    def validate(self, attrs):
        """Validate password match."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                'password': 'Passwords do not match.'
            })
        return attrs

    def create(self, validated_data):
        """Create user and client profile."""
        validated_data.pop('password_confirm')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        phone = validated_data.pop('phone', '')
        
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        
        # Create client profile
        ClientProfile.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            phone=phone
        )
        
        # Assign CLIENT role
        role = Role.objects.get(code='CLIENT')
        UserRole.objects.create(user=user, role=role)
        
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change."""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        """Validate new password match."""
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password': 'New passwords do not match.'
            })
        return attrs

    def validate_old_password(self, value):
        """Validate old password."""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Old password is incorrect.')
        return value

    def save(self):
        """Update user password."""
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class TwoFASetupSerializer(serializers.Serializer):
    """Serializer for 2FA setup."""
    secret = serializers.CharField(read_only=True)
    qr_code = serializers.CharField(read_only=True)


class TwoFAVerifySerializer(serializers.Serializer):
    """Serializer for 2FA verification."""
    code = serializers.CharField(max_length=6, required=True)

    def validate_code(self, value):
        """Validate TOTP code."""
        if not value.isdigit() or len(value) != 6:
            raise serializers.ValidationError('Code must be 6 digits.')
        return value

