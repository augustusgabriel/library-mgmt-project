from rest_framework import viewsets
from .models import BookCopy
from .serializers import BookCopySerializer
from .filters import BookCopyFilter
from drf_spectacular.utils import extend_schema
from core.schema import global_errors

# Create your views here.
@extend_schema(
    tags=["BookCopies"],
    responses={
        200: BookCopySerializer,
        **global_errors(400, 401, 403, 500)
    }
)
class BookCopyViewSet(viewsets.ModelViewSet):
    serializer_class = BookCopySerializer
    filterset_class = BookCopyFilter

    def get_queryset(self):
        book_id = self.kwargs.get('book_id')

        return BookCopy.objects.filter(book_id=book_id)