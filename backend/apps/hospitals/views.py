"""
Hospital API views. AllSearchFilterViewSet pattern + HospitalSug, HospitalOffice.
"""
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Hospital
from .serializers import HospitalSerializer


class AllSearchFilterViewSet(viewsets.ModelViewSet):
    """ModelViewSet with TokenAuth (JWT), DjangoFilterBackend, SearchFilter on all fields."""
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = []  # Subclass sets this

    def get_search_fields(self):
        if self.search_fields:
            return self.search_fields
        return ['id']  # Fallback so SearchFilter doesn't error


class HospitalViewSet(AllSearchFilterViewSet):
    queryset = Hospital.objects.all().order_by('hospital_office_id')
    serializer_class = HospitalSerializer
    search_fields = [
        'hospital_id', 'office_id', 'level', 'region', 'area_fullname',
        'lat_out', 'lng_out', 'item_num',
    ]
    filterset_fields = ['hospital_id', 'office_id', 'level', 'region']


class HospitalSugViewSet(viewsets.ReadOnlyModelViewSet):
    """Search by hospital_name, office_name (exposed as list with search param)."""
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['area_fullname']


class HospitalOfficeViewSet(viewsets.ReadOnlyModelViewSet):
    """Offices of a hospital (filter by hospital_id)."""
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['hospital_id']
