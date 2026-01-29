from django.test import TestCase


class HospitalAPITest(TestCase):
    """Hospital app and API registration."""
    def test_hospital_serializer_exists(self):
        from apps.hospitals.serializers import HospitalSerializer
        self.assertEqual(HospitalSerializer.Meta.model.__name__, 'Hospital')
