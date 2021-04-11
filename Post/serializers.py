from rest_framework import serializers
from django.contrib.auth.models import User

from Post.models import Post

class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields = ('title', 'content', 'date_posted', 'author', 'views', 'likers')
    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('email', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
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
# class GetMyInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields=('username',)