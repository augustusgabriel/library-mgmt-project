from rest_framework import viewsets
from .models import Borrow
from .serializers import BorrowSerializer

# Create your views here.
class BorrowViewSet(viewsets.ModelViewSet):
    serializer_class = BorrowSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Borrow.objects.all()
        
        return Borrow.objects.filter(user=user)