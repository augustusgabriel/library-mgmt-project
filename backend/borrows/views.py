from rest_framework import viewsets
from .models import Borrow
from .serializers import BorrowSerializer
from .filters import BorrowFilter

# Create your views here.
class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    filterset_class = BorrowFilter
    ordering_fields = ['user_username', 'borrow_date', 'due_date']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Borrow.objects.all()
        
        return Borrow.objects.filter(user=user)