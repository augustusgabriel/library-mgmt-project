from rest_framework import viewsets
from .models import Genre
from .serializers import GenreSerializer

# Create your views here.
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer