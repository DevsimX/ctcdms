from rest_framework import serializers
from .models import Outdoor, OutdoorOffsetCurve


class OutdoorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outdoor
        fields = '__all__'


class OutdoorOffsetCurveSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutdoorOffsetCurve
        fields = '__all__'
