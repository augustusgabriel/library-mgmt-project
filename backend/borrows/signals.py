from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Borrow

@receiver(post_save, sender=Borrow)
def sync_book_copy_status(sender, instance, **kwargs):
    book_copy = instance.book_copy

    if instance.status == "LS":
        book_copy.status = "LOST"

    elif instance.status == "RT":
        book_copy.status = "AVAILABLE"

    elif instance.status == "OV":
        book_copy.status = "BORROWED"

    elif instance.status == "AC":
        if instance.due_date < timezone.now().date():
            instance.status = "OV"
            instance.save(update_fields=["status"])
        book_copy.status = "BORROWED"

    book_copy.save()