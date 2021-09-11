from django.urls import path
# from .views import RoomView,CreateRoomView,GetRoom,JoinRoom,UserInRoom,LeaveRoom,UpdateRoom
from Profile.views import checkUsernameExistence, checkEmailExistence
from .views import CommentListView,getMyInfo
from Post.views import PostListView,like,dislike

urlpatterns = [
    path('currentInfo', getMyInfo),
    path('posts', PostListView.as_view()),
    path('commentSection', CommentListView.as_view()),
    path('checkEmailExistence', checkEmailExistence),
    path('checkUserNameExistence', checkUsernameExistence),
    path('posts', PostListView.as_view()),
    path('like',like),
    path('dislike', dislike),

]
# path('home', RoomView.as_view()),
# path('create-room', CreateRoomView.as_view()),
# path('get-room', GetRoom.as_view()),
# path('join-room', JoinRoom.as_view()),
# path('user-in-room', UserInRoom.as_view()),
# path('leave-room', LeaveRoom.as_view()),
# path('update-room', UpdateRoom.as_view()),