from django.db import models

# Create your models here.
class Genres(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["name"]
