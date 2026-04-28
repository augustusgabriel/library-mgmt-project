from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from .filters import BookFilter
from drf_spectacular.utils import extend_schema
from core.schema import global_errors

# Create your views here.
@extend_schema(
    tags=["Books"],
    responses={
        200: BookSerializer,
        **global_errors(400, 401, 403, 500)
    }
)
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related('genre').all()
    serializer_class = BookSerializer
    filterset_class = BookFilter
    ordering_fields = ['title', 'author', 'genre_name', 'created-at']
