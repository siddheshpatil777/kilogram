from rest_framework import serializers

from Post.models import Post
from Profile.models import Profile
from django.contrib.auth.models import User


# from .models import Room
# class RoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Room
#         fields=('id','code','host','guest_can_pause','votes_to_skip','created_at')
# class CreateRoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = ('guest_can_pause', 'votes_to_skip')
#         # a
# class UpdateRoomSerializer(serializers.ModelSerializer):
#     code=serializers.CharField(validators=[])
#     class Meta:
#         model = Room
#         fields = ('guest_can_pause', 'votes_to_skip','code')
class GetMyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username',)
