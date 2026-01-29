from rest_framework import serializers
from .models import BackApiIndoor19, IndoorResult, IndoorResultWithGroup


class BackApiIndoor19Serializer(serializers.ModelSerializer):
    class Meta:
        model = BackApiIndoor19
        fields = '__all__'


class IndoorResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndoorResult
        fields = '__all__'


class IndoorResultWithGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndoorResultWithGroup
        fields = '__all__'
