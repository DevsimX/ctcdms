"""
Project CV and area models. All tables use managed = False (existing DB).
"""
from django.db import models


class ProjectMonthCv(models.Model):
    """Project-level monthly CV: project, sample_number, year, month, average, standard_deviation, cv."""
    id = models.AutoField(primary_key=True)
    project = models.CharField(max_length=64, blank=True, null=True)
    sample_number = models.CharField(max_length=64, blank=True, null=True, db_column='sample_number')
    year = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(blank=True, null=True)
    average = models.FloatField(blank=True, null=True)
    standard_deviation = models.FloatField(blank=True, null=True, db_column='standard_deviation')
    cv = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_month_cv'


class ProjectHospitalMonthCv(models.Model):
    """Hospital/office monthly CV."""
    id = models.AutoField(primary_key=True)
    project = models.CharField(max_length=64, blank=True, null=True)
    sample_number = models.CharField(max_length=64, blank=True, null=True, db_column='sample_number')
    year = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(blank=True, null=True)
    hospital_id = models.IntegerField(blank=True, null=True, db_column='hospital_id')
    hospital_name = models.CharField(max_length=255, blank=True, null=True, db_column='hospital_name')
    office_id = models.IntegerField(blank=True, null=True, db_column='office_id')
    hospital_level = models.IntegerField(blank=True, null=True, db_column='hospital_level')
    average = models.FloatField(blank=True, null=True)
    standard_deviation = models.FloatField(blank=True, null=True, db_column='standard_deviation')
    sd = models.FloatField(blank=True, null=True)
    cv = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_hospital_month_cv'


class ProjectMonthCvArea(models.Model):
    """Area-level project CV: project, sample_number, year, month, cv, area."""
    id = models.AutoField(primary_key=True)
    project = models.CharField(max_length=64, blank=True, null=True)
    sample_number = models.CharField(max_length=64, blank=True, null=True, db_column='sample_number')
    year = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(blank=True, null=True)
    cv = models.FloatField(blank=True, null=True)
    average = models.FloatField(blank=True, null=True)
    standard_deviation = models.FloatField(blank=True, null=True, db_column='standard_deviation')
    count = models.IntegerField(blank=True, null=True)
    area = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_month_cv_area'
