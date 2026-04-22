from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from .filters import BookFilter

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related('genre').all()
    serializer_class = BookSerializer
    filterset_class = BookFilter
    ordering_fields = ['title', 'author', 'genre_name', 'created-at']
