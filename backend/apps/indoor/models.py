"""
Indoor EQA models. All tables use managed = False (existing DB).
"""
from django.db import models


class BackApiIndoor19(models.Model):
    """Raw indoor 2019 data."""
    id = models.AutoField(primary_key=True)
    hospital_office_id = models.IntegerField(blank=True, null=True, db_column='hospitalOfficeId')
    time = models.DateTimeField(blank=True, null=True)
    item = models.CharField(max_length=64, blank=True, null=True)
    sample_id = models.CharField(max_length=64, blank=True, null=True, db_column='sample_id')
    data = models.FloatField(blank=True, null=True)
    instrument = models.CharField(max_length=255, blank=True, null=True)
    reagent = models.CharField(max_length=255, blank=True, null=True)
    method = models.CharField(max_length=255, blank=True, null=True)
    group = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'backApi_indoor_19'


class IndoorResult(models.Model):
    """Indoor CV by item/hos_level/sample."""
    id = models.AutoField(primary_key=True)
    item = models.CharField(max_length=64, blank=True, null=True)
    hos_level = models.IntegerField(blank=True, null=True, db_column='hos_level')
    hos_id = models.IntegerField(blank=True, null=True, db_column='hos_id')
    hos_name = models.CharField(max_length=255, blank=True, null=True, db_column='hos_name')
    sample_id = models.CharField(max_length=64, blank=True, null=True, db_column='sample_id')
    year = models.IntegerField(blank=True, null=True)
    cv = models.FloatField(blank=True, null=True)
    data_num = models.IntegerField(blank=True, null=True, db_column='data_num')
    group_avg = models.FloatField(blank=True, null=True, db_column='group_avg')
    group_sigma = models.FloatField(blank=True, null=True, db_column='group_sigma')
    target = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'indoor_result'


class IndoorResultWithGroup(models.Model):
    """Indoor CV/sigma by instrument group."""
    id = models.AutoField(primary_key=True)
    item = models.CharField(max_length=64, blank=True, null=True)
    sample_id = models.CharField(max_length=64, blank=True, null=True, db_column='sample_id')
    group = models.CharField(max_length=64, blank=True, null=True)
    hos_id = models.IntegerField(blank=True, null=True, db_column='hos_id')
    office_id = models.IntegerField(blank=True, null=True, db_column='office_id')
    hos_level = models.IntegerField(blank=True, null=True, db_column='hos_level')
    year = models.IntegerField(blank=True, null=True)
    cv = models.FloatField(blank=True, null=True)
    sigma = models.FloatField(blank=True, null=True)
    count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'indoor_result_with_group'


class GroupIndoorResult19(models.Model):
    """2019 indoor stats by item/sample/group."""
    id = models.AutoField(primary_key=True)
    cv = models.FloatField(blank=True, null=True)
    sigma = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'group_indoor_result_19'


class LevelIndoorResult19(models.Model):
    """2019 indoor stats by item/sample/hospital level."""
    id = models.AutoField(primary_key=True)
    cv = models.FloatField(blank=True, null=True)
    sigma = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'level_indoor_result_19'


class ItemLabNumIndoor(models.Model):
    """Yearly indoor item count and lab count."""
    id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'item_lab_num_indoor'
