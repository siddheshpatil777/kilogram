from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import re
from .models import Profile
from .serializers import LoginUserSerializer
import json
from django.core.validators import validate_email


# from django.contrib.auth.decorators import
# def LoginUser(request)
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
def validateEmail( email ):
    try:
        validate_email( email )
        return True
    except ValidationError:
        return False

@api_view(['GET'])
def checkEmailExistence(request):
    email = request.GET['email']
    query_set = User.objects.all().filter(email=email)
    # print(query_set)
    if (validateEmail(email)==True and len(query_set) == 0):
        print("check Email Existence request " + email +" valid")

        return JsonResponse({'value': True, 'message': "This email is valid"}, status=status.HTTP_200_OK)
    else:
        print("check Email Existence request " + email +" not valid")

        return JsonResponse({'value': False, 'message': "This email is already Used"}, status=status.HTTP_200_OK)


def checkUsernameExistence(request):

    # print(request.GET['username'])
    # print(request.query_params)
    # return JsonResponse({'value': True, 'message': "This username is valid"}, status=status.HTTP_200_OK)
    # data = json.loads(request.body)
    username = request.GET['username']
    if(username==""):
        print("not valid")
        return JsonResponse({'value': False, 'message': "This username is already Used"}, status=status.HTTP_200_OK)
    query_set = User.objects.all().filter(username=username)
    if (len(query_set) == 0):
        print("checkUsernameExistence request "+username +" valid")
        return JsonResponse({'value': True, 'message': "This username is valid"}, status=status.HTTP_200_OK)
    else:
        print("checkUsernameExistence request " + username + " not valid")
        return JsonResponse({'value': False, 'message': "This username is already Used"}, status=status.HTTP_200_OK)


# @api_view(['POST', ])
class CustomError:
    pass


def register(request):
    print("got register request")
    print(request.body)
    data = json.loads(request.body)
    username = data['username']
    username.replace(' ', '')
    email = data['email']
    password = data['password']
    gender = data['gender']
    try:
        query_set = User.objects.all().filter(username=username)
        if (len(query_set) > 0):
            JsonResponse({'success': False, 'message': "User Name Already exists"}, status=status.HTTP_200_OK)
        query_set = User.objects.all().filter(email=email)
        if (len(query_set) > 0):
            JsonResponse({'success': False, 'message': "email address Already exists"}, status=status.HTTP_200_OK)
        try:
            validate_email(email)
        except ValidationError as e:
            JsonResponse({'success': False, 'message': "email address notValid"}, status=status.HTTP_200_OK)
        else:
            print("good email")
        user = User(username=username,email=email)
        user.set_password(password) #All ways use set password to make sure password salting and hashing is performed
        profile = Profile(user=user)
        user.save()
        profile.save()
        print(" register success")
        return JsonResponse({'success': True, 'message': "User Successfully Registered"}, status=status.HTTP_200_OK)
    except:
        print(" register fail")

        return JsonResponse({'success': False, 'message': "User not Registered"}, status=status.HTTP_200_OK)


@api_view(['POST', ])
def logoutFunc(request):
    print("got logout")
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'taskCompleted': True, 'message': "logged out succesFully"}, status=status.HTTP_200_OK)
    return JsonResponse({'taskCompleted': False, 'message': "how the fuck are you supposed to log out"},
                        status=status.HTTP_200_OK)


@api_view(['POST', ])
def loginFunc(request):

    if request.user.is_authenticated:
        return JsonResponse({'success': False,'message': 'Bad request Access already granted'}, status=status.HTTP_200_OK)
    data = json.loads(request.body)
    print('got login post')
    # username = serializer.data.get('username')
    # password = serializer.data.get('password')
    # username=request.data.get('username')
    # password = request.data.get('password')
    username = data['username']
    password = data['password']
    print(username, password)
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user)
        print('Access Granted')
        return JsonResponse({'success':True,'message': 'Access Granted'}, status=status.HTTP_200_OK)
    else:
        print('Access Denied')
        return JsonResponse({'success':False,'message':'Bad request Access Denied'}, status=status.HTTP_200_OK)


class LoginUserView(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()
        # print(list(request.POST))
        # request.body.co
        # serializer = self.serializer_class(data=request.body)
        # if(serializer.is_valid()==False):
        #     return JsonResponse({'Bad request': 'Serializer failed'}, status=status.HTTP_400_BAD_REQUEST)
        data = json.loads(request.body)
        print('got login post')
        # username = serializer.data.get('username')
        # password = serializer.data.get('password')
        # username=request.data.get('username')
        # password = request.data.get('password')
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        print(username, password)
        if user is not None:
            login(request, user)
            print('Access Granted')
            return JsonResponse({'message': 'Access Granted'}, status=status.HTTP_200_OK)
        else:
            print('Access Denied')

            return JsonResponse({'Bad request': 'Access Denied'}, status=status.HTTP_403_FORBIDDEN)
# Create your views here.
# def main(request):
#     return HttpResponse("Hello")
#
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
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
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
