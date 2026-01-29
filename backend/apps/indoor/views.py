from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import BackApiIndoor19
from .serializers import BackApiIndoor19Serializer


class BackApiIndoor19ViewSet(viewsets.ModelViewSet):
    queryset = BackApiIndoor19.objects.all()
    serializer_class = BackApiIndoor19Serializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['hospital_office_id', 'item', 'sample_id', 'group']
    search_fields = ['item', 'sample_id', 'instrument', 'reagent', 'method', 'group']
