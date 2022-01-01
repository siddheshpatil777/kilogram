from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    bio=models.CharField(max_length=80)
    follwings=models.ManyToManyField('self',null=True,related_name='follwings')
    followers = models.ManyToManyField('self', null=True, related_name='followers')


