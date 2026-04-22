from rest_framework import viewsets
from .models import BookCopy
from .serializers import BookCopySerializer

# Create your views here.
class BookCopyViewSet(viewsets.ModelViewSet):
    serializer_class = BookCopySerializer

    def get_queryset(self):
        queryset = BookCopy.objects.all()

        only_available = self.request.query_params.get('available')

        if only_available:
            is_available = only_available.lower() in ['true', '1', 'yes', 't']
            if is_available:
                queryset = queryset.filter(status='AVAILABLE')
        
        return queryset.order_by('book__title')