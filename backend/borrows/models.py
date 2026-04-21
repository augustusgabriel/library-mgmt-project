from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from users.models import CustomUser
from bookcopies.models import BookCopy

# Create your models here.
class Borrow(models.Model):
    class BorrowStatus(models.TextChoices):
        ACTIVE = "AC", _('Active')
        RETURNED = "RT", _('Returned')
        OVERDUE = 'OV', _('Overdue')
        LOST = 'LS', _('Lost')

    user = models.ForeignKey(
        CustomUser,
        related_name='borrows',
        on_delete=models.CASCADE
    )

    book_copy = models.ForeignKey(
        BookCopy,
        related_name='borrows',
        on_delete=models.CASCADE
    )

    borrow_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    status = models.CharField(
        max_length=2,
        choices=BorrowStatus.choices,
        default=BorrowStatus.ACTIVE
    )

    def __str__(self):
        return f"{self.book_copy} - {self.user.username} | {self.status}"
    
    class Meta:
        ordering = ['-due_date']
    
    def is_overdue(self):
        return(
            self.status == self.BorrowStatus.ACTIVE and 
            timezone.now().date() > self.due_date
        )