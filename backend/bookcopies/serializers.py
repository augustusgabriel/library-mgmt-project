from rest_framework import serializers
from .models import BookCopy
from books.models import Book


class BookCopySerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    book_name = serializers.StringRelatedField(source='book', read_only=True)

    class Meta:
        model = BookCopy
        fields = ["id", "status", "book", "book_name"]