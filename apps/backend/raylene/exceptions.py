"""
Custom exception handlers for DRF.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns consistent error responses.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    if response is not None:
        # Customize the response data structure
        custom_response_data = {
            'error': {
                'status_code': response.status_code,
                'detail': response.data.get('detail', 'An error occurred'),
                'errors': response.data,
            }
        }
        response.data = custom_response_data
    else:
        # Handle unexpected errors
        logger.exception("Unhandled exception occurred")
        response = Response(
            {
                'error': {
                    'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'detail': 'An unexpected error occurred',
                    'errors': {},
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return response

