from rest_framework import serializers
from .models import ProjectMonthCv, ProjectHospitalMonthCv, ProjectMonthCvArea


class ProjectMonthCvSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMonthCv
        fields = '__all__'


class ProjectHospitalMonthCvSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHospitalMonthCv
        fields = '__all__'


class ProjectMonthCvAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMonthCvArea
        fields = '__all__'
