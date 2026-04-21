from rest_framework import serializers
from .models import Borrow


class BorrowSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    user_username = serializers.ReadOnlyField(source='user.username')
    is_overdue = serializers.SerializerMethodField()

    class Meta:
        model = Borrow
        fields = [
            "id",
            "user",
            "user_username",
            "book_copy",
            "borrow_date",
            "due_date",
            "status",
            "is_overdue",
        ]
    
    def validate(self, data):
        book_copy = data.get('book_copy')

        if not book_copy:
            return data

        if self.instance is None:
            is_already_borrowed = Borrow.objects.filter(
                book_copy=book_copy,
                status__in=["AC", "OV"]
            ).exists()

            if is_already_borrowed:
                raise serializers.ValidationError("This copy is already borrowed.")
        
        return data
    
    def get_is_overdue(self, obj):
        return obj.is_overdue()
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        if instance.status == "AC" and instance.is_overdue():
            instance.status = "OV"
            instance.save()
        
        return instance