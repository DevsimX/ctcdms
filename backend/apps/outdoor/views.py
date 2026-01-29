from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Outdoor, OutdoorOffsetCurve
from .serializers import OutdoorSerializer, OutdoorOffsetCurveSerializer


class OutdoorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Outdoor.objects.all()
    serializer_class = OutdoorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['hos_code', 'pro_code', 'sample_no', 'qualified']
    search_fields = ['hos_code', 'pro_code', 'sample_no']


class OutdoorOffsetCurveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OutdoorOffsetCurve.objects.all()
    serializer_class = OutdoorOffsetCurveSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['item', 'hospital_id']
