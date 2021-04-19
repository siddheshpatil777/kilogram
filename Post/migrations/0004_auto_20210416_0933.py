# Generated by Django 3.1.7 on 2021-04-16 09:33

from django.db import migrations
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0003_auto_20210416_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='parent',
            field=mptt.fields.TreeForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='Post.comment'),
        ),
    ]
