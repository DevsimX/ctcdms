from rest_framework import serializers
from .models import MutualRecognition


class MutualRecognitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MutualRecognition
        fields = '__all__'
