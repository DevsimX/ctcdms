"""
Item and TEA models. All tables use managed = False (existing DB).
"""
from django.db import models


class Item(models.Model):
    """559 test items: id, domain, name, initial."""
    id = models.AutoField(primary_key=True)
    domain = models.CharField(max_length=64, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    initial = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item'

    def __str__(self):
        return self.name or str(self.id)


class ItemTea(models.Model):
    """TEA (allowable error) per item."""
    item = models.IntegerField(primary_key=True, db_column='item')
    tea = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_tea'
