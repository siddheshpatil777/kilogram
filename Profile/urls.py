from django.urls import path, include
from .views import LoginUserView, loginFunc, logoutFunc, register
from .api import RegisterAPI, LoginAPI,UserAPI
from knox import views as knox_views
from Post.views import PostListView,like,dislike
urlpatterns = [
    path('/',  include('knox.urls')),
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('logout', logoutFunc),
    path('user', UserAPI.as_view()),
    path('posts', PostListView.as_view()),

    # path('login',loginFunc),
    # path('logout',logoutFunc),
    # path('register',register),
]
# path('home', RoomView.as_view()),
# path('create-room', CreateRoomView.as_view()),
# path('get-room', GetRoom.as_view()),
# path('join-room', JoinRoom.as_view()),
# path('user-in-room', UserInRoom.as_view()),
# path('leave-room', LeaveRoom.as_view()),
# path('update-room', UpdateRoom.as_view()),
