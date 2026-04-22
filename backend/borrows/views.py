from rest_framework import viewsets, filters # Filters serve apenas como barra de pesquisa
from .models import Borrow
from .serializers import BorrowSerializer

# Create your views here.
class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['due_date']

    ordering_fields = ['due_date', 'status', 'user_username']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Borrow.objects.all()
        
        return Borrow.objects.filter(user=user)