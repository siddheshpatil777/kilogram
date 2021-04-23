from django.urls import path
# from .views import RoomView,CreateRoomView,GetRoom,JoinRoom,UserInRoom,LeaveRoom,UpdateRoom
from .views import GetMyInfo,CommentListView
from Post.views import PostListView

urlpatterns = [
    path('currentInfo', GetMyInfo.as_view()),
    path('posts', PostListView.as_view()),
    path('checkEmailExistence', CommentListView.as_view()),
    path('checkUserNameExistence', CommentListView.as_view()),

]
# path('home', RoomView.as_view()),
# path('create-room', CreateRoomView.as_view()),
# path('get-room', GetRoom.as_view()),
# path('join-room', JoinRoom.as_view()),
# path('user-in-room', UserInRoom.as_view()),
# path('leave-room', LeaveRoom.as_view()),
# path('update-room', UpdateRoom.as_view()),