# Generated by Django 3.1.7 on 2021-04-17 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0005_auto_20210416_0934'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='images/temp.png', upload_to='images/'),
        ),
    ]
