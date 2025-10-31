"""
URL configuration for raylene project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

schema_view = get_schema_view(
    title='Raylene Immigration Solutions API',
    version='1.0.0',
    description='API for immigration application management platform',
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # API Routes
    path('api/auth/', include('accounts.urls')),
    path('api/me/', include('accounts.urls')),
    path('api/applications/', include('applications.urls')),
    path('api/bookings/', include('bookings.urls')),
    path('api/billing/', include('billing.urls')),
    path('api/communications/', include('communications.urls')),
    path('api/content/', include('content.urls')),
    path('api/admin/', include('accounts.admin_urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin site customization
admin.site.site_header = 'Raylene Immigration Solutions'
admin.site.site_title = 'Raylene Admin'
admin.site.index_title = 'Administration'

