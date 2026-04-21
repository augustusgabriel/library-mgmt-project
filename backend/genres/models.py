from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["name"]
