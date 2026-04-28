from rest_framework import viewsets
from .models import Genre
from .serializers import GenreSerializer
from drf_spectacular.utils import extend_schema
from core.schema import global_errors

# Create your views here.
@extend_schema(
    tags=["Genres"],
    responses={
        200: GenreSerializer,
        **global_errors(400, 401, 403, 500)
    }
)
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    pagination_class = None