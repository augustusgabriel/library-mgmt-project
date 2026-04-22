from django_filters import rest_framework as filters
from .models import BookCopy


class BookCopyFilter(filters.FilterSet):
    available = filters.BooleanFilter(method='filter_available')

    class Meta:
        model = BookCopy
        fields = ['available']
    
    def filter_available(self, queryset, name, value):
        if value:
            return queryset.filter(status='AVAILABLE')
        elif value is False:
            return queryset.exclude(status='AVAILABLE')
        return queryset