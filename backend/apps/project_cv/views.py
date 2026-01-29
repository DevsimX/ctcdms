from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import ProjectMonthCv
from .serializers import ProjectMonthCvSerializer


class ProjectMonthCvViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectMonthCv.objects.all()
    serializer_class = ProjectMonthCvSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['project', 'sample_number', 'year', 'month']
    search_fields = ['project', 'sample_number']
