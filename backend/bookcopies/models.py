from django.db import models
from books.models import Book

# Create your models here.
class BookCopy(models.Model):
    class Status(models.TextChoices):
        BORROWED = "BORROWED", "Borrowed"
        AVAILABLE = "AVAILABLE", "Available"
        DAMAGED = "DAMAGED", "Damaged"
        LOST = "LOST", "Lost"

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.AVAILABLE
    )
    book = models.ForeignKey(Book, related_name='copies', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.book.title} - (Copy #{self.id}) - {self.status}"

    class Meta:
        ordering = ['status']