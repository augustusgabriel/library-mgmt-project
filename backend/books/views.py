from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.select_related('genre').all()

        title = self.request.query_params.get('title')
        author = self.request.query_params.get('author')
        genre_name = self.request.query_params.get('genre')

        if title:
            queryset = queryset.filter(title__icontains=title)
        
        if author:
            queryset = queryset.filter(author__icontains=author)
        
        if genre_name:
            queryset = queryset.filter(genre__name__icontains=genre_name)
        
        return queryset