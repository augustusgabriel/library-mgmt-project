from rest_framework import serializers

class GlobalErrorSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=["error"])
    message = serializers.CharField()
    details = serializers.DictField()