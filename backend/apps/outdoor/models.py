"""
Outdoor EQA models. All tables use managed = False (existing DB).
"""
from django.db import models


class Outdoor(models.Model):
    """Outdoor EQA: pro_code, hos_code, sample_no, test_values, qualified, time, etc."""
    id = models.AutoField(primary_key=True)
    pro_code = models.CharField(max_length=64, blank=True, null=True, db_column='pro_code')
    hos_code = models.CharField(max_length=64, blank=True, null=True, db_column='hos_code')
    dep_code = models.CharField(max_length=64, blank=True, null=True, db_column='dep_code')
    sample_no = models.CharField(max_length=64, blank=True, null=True, db_column='sample_no')
    test_values = models.FloatField(blank=True, null=True, db_column='test_values')
    x = models.FloatField(blank=True, null=True)
    sd = models.FloatField(blank=True, null=True)
    instrument = models.CharField(max_length=255, blank=True, null=True)
    reagent = models.CharField(max_length=255, blank=True, null=True)
    method = models.CharField(max_length=255, blank=True, null=True)
    qualified = models.IntegerField(blank=True, null=True)
    time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'outdoor'


class OutdoorOffsetCurve(models.Model):
    """Offset curves: item, hospital_id, fitted_curve, etc."""
    id = models.AutoField(primary_key=True)
    item = models.CharField(max_length=64, blank=True, null=True)
    hospital_id = models.IntegerField(blank=True, null=True, db_column='hospital_id')
    fitted_curve = models.TextField(blank=True, null=True, db_column='fitted_curve')
    fitted_curve_slope = models.FloatField(blank=True, null=True, db_column='fitted_curve_slope')
    fitted_curve_intercept = models.FloatField(blank=True, null=True, db_column='fitted_curve_intercept')
    detection_value = models.FloatField(blank=True, null=True, db_column='detection_value')
    offset_value = models.FloatField(blank=True, null=True, db_column='offset_value')

    class Meta:
        managed = False
        db_table = 'outdoor_offset_curve'


class ItemLabNumOutdoor(models.Model):
    """Yearly outdoor item count and lab count."""
    id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'item_lab_num_outdoor'
