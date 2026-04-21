from rest_framework import viewsets
from .models import Genres
from .serializers import GenreSerializer

# Create your views here.
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genres.objects.all()
    serializer_class = GenreSerializer