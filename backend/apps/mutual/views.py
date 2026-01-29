from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import MutualRecognition
from .serializers import MutualRecognitionSerializer


class MutualRecognitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MutualRecognition.objects.all()
    serializer_class = MutualRecognitionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['hos_id', 'item']
    search_fields = ['hos_name', 'item']
