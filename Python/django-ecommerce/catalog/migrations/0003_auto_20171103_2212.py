# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-04 00:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_auto_20171103_2209'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='slog',
            new_name='slug',
        ),
    ]
