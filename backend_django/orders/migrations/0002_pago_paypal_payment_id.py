# Generated by Django 5.2 on 2025-04-27 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pago',
            name='paypal_payment_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
