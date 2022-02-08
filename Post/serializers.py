from rest_framework import serializers
from django.contrib.auth.models import User

from Post.models import Post, Comment


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'content', 'date_posted', 'author', 'views')

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('email', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

    def to_representation(self, instance):
        x = super().to_representation(instance)
        user = self.context['user_who_asked']
        x['is_liked'] = instance.likers.filter(pk=user.pk).exists()
        x['views'] = len(x['views'])
        x['image'] = instance.image.url
        x['author_name']=instance.author.username
        return x


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'date_posted', 'author',)

    def to_representation(self, instance):
        x = super().to_representation(instance)
        x['post_id'] = instance.post.id
        if (instance.parent):
            x['parent'] = instance.parent.id
        else:
            x['parent'] = 0
        x['author_name'] = instance.author.username
        user = self.context['user_who_asked']
        x['is_liked'] = instance.likers.filter(pk=user.pk).exists()
        return x
# class HighScoreSerializer(serializers.BaseSerializer):
#
#     def to_representation(self, instance):
#         return {
#             'score': instance.score,
#             'player_name': instance.player_name
#         }
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
