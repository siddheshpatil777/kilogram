from rest_framework import serializers
from django.contrib.auth.models import User

from Post.models import Post

class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields = ('id','title', 'image','content', 'date_posted', 'author', 'views')

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('email', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

    def to_representation(self, instance):
        x=super().to_representation(instance)
        print(self.context)
        print(instance)
        user=self.context['userWhoAsked']
        x['isLiked'] = instance.likers.filter(pk=user.pk).exists()
        # # if instance.likers.filter(user=user).exists():
        # if :
        #
        # else:
        #     x['isLiked'] = False
        return x


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','content', 'date_posted', 'author', )

    def to_representation(self, instance):
        """Convert `username` to lowercase."""
        ret = super().to_representation(instance)
        ret['post_id'] =instance.post.id
        if(instance.parent):
            ret['parent'] = instance.parent.id
        else:
            ret['parent'] = 0

        return ret
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