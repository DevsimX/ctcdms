"""
Scores and examination models. All tables use managed = False (existing DB).
"""
from django.db import models


class ExamineResult(models.Model):
    """Inspection scores: quality_control_id, hospital, rank, office, score, year."""
    id = models.AutoField(primary_key=True)
    quality_control_id = models.IntegerField(blank=True, null=True, db_column='quality_control_id')
    hospital = models.IntegerField(blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    office = models.IntegerField(blank=True, null=True)
    score = models.FloatField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'examine_result'


class HospitalScore(models.Model):
    """Aggregated scores: hospital_id (PK), total_score, examine_score, indoor_score, outdoor_score, level, region_code."""
    hospital_id = models.IntegerField(primary_key=True, db_column='hospital_id')
    hospital_name = models.CharField(max_length=255, blank=True, null=True, db_column='hospital_name')
    total_score = models.FloatField(blank=True, null=True, db_column='total_score')
    examine_score = models.FloatField(blank=True, null=True, db_column='examine_score')
    indoor_score = models.FloatField(blank=True, null=True, db_column='indoor_score')
    outdoor_score = models.FloatField(blank=True, null=True, db_column='outdoor_score')
    level = models.IntegerField(blank=True, null=True)
    region_code = models.CharField(max_length=64, blank=True, null=True, db_column='region_code')

    class Meta:
        managed = False
        db_table = 'hospital_score'
