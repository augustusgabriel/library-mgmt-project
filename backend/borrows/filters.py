from django_filters import rest_framework as filters
from django.utils import timezone
from .models import Borrow


class BorrowFilter(filters.FilterSet):
    status = filters.CharFilter(field_name='status', lookup_expr='iexact')
    due_date = filters.DateFilter(field_name='due_date', lookup_expr='exact')
    overdue = filters.BooleanFilter(method='filter_overdue')

    class Meta:
        model = Borrow
        fields = ['status', 'due_date', 'overdue']
    
    def filter_overdue(self, queryset, name, value):
        today = timezone.now()

        if value:
            return queryset.filter(due_date__lt=today).exclude(status='RT')
        elif value is False:
            return queryset.filter(due_date__gte=today)
        return queryset