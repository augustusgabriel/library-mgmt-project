from rest_framework import serializers
from .models import Book
from genres.models import Genre


class BookSerializer(serializers.ModelSerializer):
    genre = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all())
    genre_name = serializers.StringRelatedField(source='genre', read_only=True)

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "summary",
            "author",
            "number_pages",
            "genre",
            "genre_name",
            "created_at",
        ]
    
    def validate(self, data):
        title = data.get('title')
        author = data.get('author')

        queryset = Book.objects.all()

        # Se for update, exclui próprio objeto
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)


        if queryset.filter(
            title__iexact=title,
            author__iexact=author
        ).exists():
            raise serializers.ValidationError("Book already exists")
        return data