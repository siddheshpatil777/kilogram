from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
# class LoginUserSerializer(serializers.ModelSerializer):
class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ('username',  'email', 'id')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self,data):
        user=authenticate(**data)
        if user and  user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email','password')
        extra_kwargs={'password':{'write_only':True}}
    def create(self,validated_data):
        user= User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user
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