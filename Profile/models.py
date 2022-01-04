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
    verified = models.BooleanField(default=False)
    followings=models.ManyToManyField('self',null=True,blank=True,related_name='followings')
    followers = models.ManyToManyField('self', null=True,  blank=True,related_name='followers')
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.__str__()

    # def delete(self, using=None, keep_parents=False):
    #     self.user.delete()
    #     return super().delete(using, keep_parents)

    @staticmethod
    def getProfileFromUser(user):
        return Profile.objects.get(user=user)
