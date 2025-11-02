"""Billing views."""
from rest_framework import viewsets, permissions
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer


class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for invoices."""
    queryset = Invoice.objects.all()  # Required for router basename
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        is_staff = user.is_staff
        if is_staff:
            return Invoice.objects.all()
        return Invoice.objects.filter(client=user)
    
    serializer_class = InvoiceSerializer


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    """View set for payments."""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

