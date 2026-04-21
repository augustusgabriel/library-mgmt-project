from rest_framework import viewsets
from .models import BookCopy
from .serializers import BookCopySerializer

# Create your views here.
class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer