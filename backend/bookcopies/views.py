from rest_framework import viewsets
from .models import BookCopy
from .serializers import BookCopySerializer
from .filters import BookCopyFilter

# Create your views here.
class BookCopyViewSet(viewsets.ModelViewSet):
    serializer_class = BookCopySerializer
    filterset_class = BookCopyFilter

    def get_queryset(self):
        book_id = self.kwargs.get('book_id')

        return BookCopy.objects.filter(book_id=book_id)