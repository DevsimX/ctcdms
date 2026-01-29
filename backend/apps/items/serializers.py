from rest_framework import serializers
from .models import Item, ItemTea


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ItemTeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemTea
        fields = '__all__'
