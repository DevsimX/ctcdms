"""
Mutual recognition models. All tables use managed = False (existing DB).
"""
from django.db import models


class MutualRecognition(models.Model):
    """Hospital–item mutual recognition: hos_id, hos_name, item."""
    id = models.AutoField(primary_key=True)
    hos_id = models.IntegerField(blank=True, null=True, db_column='hos_id')
    hos_name = models.CharField(max_length=255, blank=True, null=True, db_column='hos_name')
    item = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mutual_recognition'
