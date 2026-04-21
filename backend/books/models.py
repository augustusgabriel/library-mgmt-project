from django.db import models
from genres.models import Genre

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    author = models.CharField(max_length=255)
    number_pages = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    genre = models.ForeignKey(
        Genre,
        related_name='books',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.title} - {self.author}"
    
    def save(self, *args, **kwargs):
        if self.title:
            self.title = self.title.strip()
        if self.author:
            self.author = self.author.strip()
        
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['title']
        constraints = [
            models.UniqueConstraint(
                fields=['title', 'author'],
                name='unique_book_title_author'
            )
        ]