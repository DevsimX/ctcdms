from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Item, ItemTea
from .serializers import ItemSerializer, ItemTeaSerializer


class ItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['domain', 'initial']
    search_fields = ['name', 'domain', 'initial']


class ItemTeaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ItemTea.objects.all()
    serializer_class = ItemTeaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['item']
