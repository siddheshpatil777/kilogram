from django.urls import path
from . import views
# from user import views as u_views
# from .views import PostListView, PostDetailView, PostUpdateView, PostDeleteView, Search
# , CommentCreateView
# from .views import commentFunc
from .views import PostListView,PostDetailView
urlpatterns = [
    path('', PostDetailView.as_view()),
    # path('', PostListView),
    # path('', PostListView, name='blog-home'),
    # path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    # path('post/<type>/new/', views.postcreate, name='post-create'),
    # path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    # path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    # path('post/<int:pk>/comment/new/', commentFunc, name='post-comment'),
    # path('like/$', views.likepost, name = 'like-post'),
    # path('<tag>/explore/', views.ExploreTagView, name = 'explore-tag'),
    # path('poll/create/',views.pollnew,name='poll_create'),
    # path('poll/add/<int:pk>/<int:pollid>/',views.addpoll,name='addpoll'),
    # path('search/', Search, name='search'),
]
