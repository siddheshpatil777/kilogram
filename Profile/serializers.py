from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
# class LoginUserSerializer(serializers.ModelSerializer):
class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[])
    password = serializers.CharField(validators=[])
    class Meta:
        model = User
        fields = ('username', 'password','id')
        # a
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