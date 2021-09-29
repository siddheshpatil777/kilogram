from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from Profile.serializers import RegisterUserSerializer, UserSerializer, LoginUserSerializer
from rest_framework.authtoken.views import ObtainAuthToken


class RegisterAPI(generics.GenericAPIView, ObtainAuthToken):
    serializer_class = RegisterUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token": token.key,
        })
class LoginAPI(generics.GenericAPIView, ObtainAuthToken):
    serializer_class = LoginUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token": token.key,
        })
class UserAPI(generics.RetrieveAPIView,ObtainAuthToken):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

