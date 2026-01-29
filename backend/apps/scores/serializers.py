from rest_framework import serializers
from .models import HospitalScore, ExamineResult


class HospitalScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalScore
        fields = '__all__'


class ExamineResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamineResult
        fields = '__all__'
