"""
Hospital/office models. All tables use managed = False (existing DB).
"""
from django.db import models


class Hospital(models.Model):
    """Hospital/office info."""
    hospital_office_id = models.AutoField(primary_key=True, db_column='hospitalOfficeId')
    hospital_id = models.IntegerField(blank=True, null=True, db_column='hospital_id')
    office_id = models.IntegerField(blank=True, null=True, db_column='office_id')
    level = models.IntegerField(blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    area_fullname = models.CharField(max_length=255, blank=True, null=True, db_column='area_fullname')
    lat_out = models.FloatField(blank=True, null=True, db_column='lat_out')
    lng_out = models.FloatField(blank=True, null=True, db_column='lng_out')
    item_num = models.IntegerField(blank=True, null=True, db_column='item_num')

    class Meta:
        managed = False
        db_table = 'hospital'

    def __str__(self):
        return f'Hospital {self.hospital_office_id}'
