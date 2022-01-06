import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, status
# from .models import Room
# from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer, GetMyInfoSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from Post.models import Comment, Post
from Post.serializers import CommentSerializer
from .serializers import GetMyInfoSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
def main(request):
    return HttpResponse("Hello")

# @api_view(['GET'])
def getMyInfo(request):
    # return Response({'username': 'sid'}, status=status.HTTP_200_OK);
    print("got getMyInfo from ",request.user)
    if request.user.is_authenticated:
        response = JsonResponse(GetMyInfoSerializer(request.user).data, status=status.HTTP_200_OK)
        # response['Access-Control-Allow-Origin'] = '*'
        return response
    return JsonResponse({'username': None}, status=status.HTTP_200_OK)



class CommentListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset=Comment.objects.all()
    def list(self, request,post_id):

        # Note the use of `get_queryset()` instead of `self.queryset`
        # data = json.loads(request.body)
        # post = data['post']
        # queryset = Comment.objects.all().filter(post=post)
        # data = json.loads(request.body)
        # post_id = int(data['user_who_asked'])

        post=Post.objects.all().get(id=post_id)
        queryset = self.get_queryset().filter(post=post)

        serializer = CommentSerializer(queryset, many=True,context={'user_who_asked': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)

#
# class RoomView(generics.ListAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#
#
# class CreateRoomView(APIView):
#     serializer_class = CreateRoomSerializer
#
#     def post(self, request, format=None):
#         # if not self.request.session.exists(self.request.session.session_key):
#         #     self.request.session.create()
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             guest_can_pause = serializer.data.get('guest_can_pause')
#             votes_to_skip = serializer.data.get('votes_to_skip')
#             host = self.request.session.session_key
#             queryset = Room.objects.filter(host=host)
#             if queryset.exists():
#                 room = queryset[0]
#                 room.guest_can_pause = guest_can_pause
#                 room.votes_to_skip = votes_to_skip
#                 self.request.session['room_code'] = room.code
#                 room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
#             else:
#                 room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
#                 self.request.session['room_code'] = room.code
#                 room.save()
#             return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
#         return Response({'Bad request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
#
#
# class GetRoom(APIView):
#     serializer_class = RoomSerializer
#     lookup_url_kwarg = 'code'
#
#     def get(self, request, format=None):
#         code = request.GET.get(self.lookup_url_kwarg)
#         if (code != None):
#             room = Room.objects.filter(code=code)
#             if (len(room) > 0):
#                 data = RoomSerializer(room[0]).data
#                 data['is_host'] = self.request.session.session_key == room[0].host
#                 return Response(data, status=status.HTTP_200_OK)
#             return Response({'Room Not Found': 'Invalid croom code'}, status=status.HTTP_404_NOT_FOUND)
#         return Response({'Bad request': 'Code parameter not found'}, status=status.HTTP_400_BAD_REQUEST)
#
# class UserInRoom(APIView):
#
#     def get(self,request,format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
#         data={
#             'code':self.request.session.get('room_code')
#         }
#         return JsonResponse(data,status=status.HTTP_200_OK)
# class JoinRoom(APIView):
#     lookup_url_kwarg = 'code'
#
#     def post(self, request, format=None):
#
#         # return Response({'Bad Request': "did not find the code"}, status=status.HTTP_400_BAD_REQUEST)
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
#         code = request.data.get(self.lookup_url_kwarg)
#         print("code =" + code)
#         if code != None:
#             room_result = Room.objects.filter(code=code)
#             if (len(room_result) > 0):
#                 room = room_result[0]
#                 self.request.session['room_code'] = code
#                 print("got room")
#                 return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
#             return Response({'message': 'Room not found'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'message': "did not find the code"}, status=status.HTTP_400_BAD_REQUEST)
# class LeaveRoom(APIView):
#     def post(self,request,format=None):
#         if 'room_code' in self.request.session:
#             code=self.request.session.pop('room_code')
#             host_id=self.request.session.session_key
#             room_results=Room.objects.filter(host=host_id)
#             if(len(room_results)>0):
#                 room =room_results[0]
#                 room.delete()
#         return Response({'Message':'Success'},status=status.HTTP_200_OK)
# class UpdateRoom(APIView):
#     serializer_class=UpdateRoomSerializer
#     def patch(self,request,format=None):
#         serializer=self.serializer_class(data=request.data)
#         if(serializer.is_valid()):
#             if not self.request.session.exists(self.request.session.session_key):
#                 self.request.session.create()
#             guest_can_pause = serializer.data.get('guest_can_pause')
#             votes_to_skip = serializer.data.get('votes_to_skip')
#             code = serializer.data.get('code')
#             queryset=Room.objects.filter(code=code)
#             if not queryset.exists():
#                 return Response({'msg': 'Room does not exist'}, status=status.HTTP_404_NOT_FOUND)
#             room=queryset[0]
#             user_id=self.request.session.session_key
#             if room.host!=user_id:
#                 return Response({'msg': 'You are not host'}, status=status.HTTP_403_FORBIDDEN)
#             room.guest_can_pause = guest_can_pause
#             room.votes_to_skip = votes_to_skip
#             room.save(update_fields=['guest_can_pause','votes_to_skip'])
#             return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
#
#         return Response({'Bad Request': 'invalid code'}, status=status.HTTP_400_BAD_REQUEST)
#
