from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import HospitalScore, ExamineResult
from .serializers import HospitalScoreSerializer, ExamineResultSerializer


class HospitalScoreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HospitalScore.objects.all()
    serializer_class = HospitalScoreSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['hospital_id', 'level', 'region_code']
    search_fields = ['hospital_name', 'region_code']


class ExamineResultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ExamineResult.objects.all()
    serializer_class = ExamineResultSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['hospital', 'office', 'year']
