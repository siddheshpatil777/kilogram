from django.urls import path
# from .views import RoomView,CreateRoomView,GetRoom,JoinRoom,UserInRoom,LeaveRoom,UpdateRoom
from Profile.views import checkUsernameExistence, checkEmailExistence
from .views import CommentListView,getMyInfo
from Post.views import PostListView,post_like,post_dislike,comment_like,comment_dislike,PostDetailView



urlpatterns = [
    path('posts', PostListView.as_view()),
    path('post', PostDetailView.as_view()),
    path('currentInfo', getMyInfo),
    path('commentSection', CommentListView.as_view()),
    path('checkEmailExistence', checkEmailExistence),
    path('checkUserNameExistence', checkUsernameExistence),
    # path('posts', PostListView.as_view()),
    path('post/like',post_like),
    path('post/dislike', post_dislike),
    path('comment/like', comment_like),
    path('comment/dislike', comment_dislike),
]
# path('home', RoomView.as_view()),
# path('create-room', CreateRoomView.as_view()),
# path('get-room', GetRoom.as_view()),
# path('join-room', JoinRoom.as_view()),
# path('user-in-room', UserInRoom.as_view()),
# path('leave-room', LeaveRoom.as_view()),
# path('update-room', UpdateRoom.as_view()),