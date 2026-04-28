from django.contrib.auth.password_validation import validate_password as validate
from .models import CustomUser
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "password", "is_active", "created_at", "updated_at"]
        extra_kwargs = {
            "id": {"read_only": True},
            "password": {"write_only": True}
        }

    def validate_password(self, value):
        validate(value)
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            self.validate_password(password)
            instance.set_password(password)
        
        instance.save()
        return instance

class LogoutRequestSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

class LogoutResponseSerializer(serializers.Serializer):
    message = serializers.CharField()