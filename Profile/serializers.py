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

class ProfileDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields = ('location', 'birth_date','verified','location','bio')

    # def create(self, validated_data):
    #     return Profile.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     # instance.title = validated_data.get('email', instance.title)
    #     # instance.content = validated_data.get('content', instance.content)
    #     # instance.save()
    #     return instance

    def to_representation(self, instance):
        x=super().to_representation(instance)
        x['username']=instance.user.username
        x['followers_count']=len(instance.followers.all())
        x['followings_count']=len(instance.followings.all())
        return x
