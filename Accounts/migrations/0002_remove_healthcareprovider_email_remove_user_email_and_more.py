# Generated by Django 4.2.7 on 2023-11-05 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='healthcareprovider',
            name='email',
        ),
        migrations.RemoveField(
            model_name='user',
            name='email',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]