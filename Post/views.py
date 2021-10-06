import json
from json import loads, load
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from Post.models import Post, Comment
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from rest_framework import generics, status

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from Post.serializers import PostDetailSerializer


# class PostListView(ListCreateAPIView):
#     serializer_class =PostDetailSerializer

# queryset = Post.objects.all()
# def get_queryset(self):
# last_two_days = now() - timedelta(days=2)
# return Question.objects.filter(pub_date__gt=last_two_days)
#
# def likeIt(request):
#     if(request.method==request.POST):
#         PO

class PostListView(generics.ListCreateAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    # authentication_classes = [TokenAuthentication]
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    # def get_object(self):
    #     return self.request.user
    def get_queryset(self):
        return Post.objects.all()
            # .filter(author=self.request.user)
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        print("request for post from", request.user)
        serializer = PostDetailSerializer(queryset, many=True, context={'userWhoAsked': request.user})
        # serializer = PostDetailSerializer(queryset, many=True)

        # PostDetailSerializer()
        # return JsonResponse(serializer.data)
        # serializer.is_valid()
        return Response(serializer.data)


#  if(request.user.is_authenticated):
#      queryset = self.get_queryset()
#      serializer = PostDetailSerializer(queryset, many=True)
#      return J(serializer.data,status=)
# else:
#  return Response()
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like(request):
    print("got request for like")
    # data = request.data
    data = json.loads(request.body)
    post_id = int(data['post_id'])
    print("post id recieved ", post_id)
    query = Post.objects.all().filter(pk=post_id)
    if (len(query) > 0):
        post = query.first()
        post.likers.add(request.user)
        return JsonResponse({'success': True}, status=status.HTTP_200_OK)
    return JsonResponse({'success': False, 'error': 'PostId does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def dislike(request):
    print("got request for dislike")
    # print(request.data)
    # data = json.loads(request.body)
    data = json.loads(request.body)
    post_id = int(data['post_id'])
    print("post id recieved ", post_id)
    query = Post.objects.all().filter(pk=post_id)
    if (len(query) > 0):
        post = query.first()
        post.likers.remove(request.user)
        # post.likers.add(request.user)
        return JsonResponse({'success': True}, status=status.HTTP_200_OK)
    return JsonResponse({'success': False, 'error': 'PostId does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([permissions.IsAuthenticated])
def commentSection(request):
    # data = json.loads(request.body)
    data = request.data
    post_id = data['post_id']
    Comment.objects.all().filter(post=post_id)

# @api_view(['GET', ])
# def PostListView(request):
#     # queryset = User.objects.all()
#
#
#
#     # if request.user.is_authenticated:
#     # print(list(request.GET))
#     # request.get('post_from')
#     # requestData = load(request.body)
#     # body_unicode = request.body.decode('utf-8')
#     # body = loads(body_unicode)
#     # requestData = loads(body)
#     # print(requestData)
#     print(request.body)
#     requestData = loads(request.body)
#     # page_number = requestData['page_number']
#     #
#     post_from = 0
#     post_from = requestData['post_from']
#     if (post_from < 0):
#         return JsonResponse({'ERROR': 'post_from is less than 0'}, status=status.HTTP_400_BAD_REQUEST)
#     post_till = 2
#     post_till = requestData['post_till']
#     if (post_till < 0):
#         return JsonResponse({'ERROR': 'post_till is less than 0'}, status=status.HTTP_400_BAD_REQUEST)
#     # page_number = requestData['page_number']
#     # page_number = requestData['page_number']
#     posts = Post.objects.filter().order_by('-date_posted')[
#             max(0, post_from):min(len(Post.objects.all()), max(post_till, 0))]
#     # posts = Post.objects.all()
#     serializer = PostDetailSerializer(posts, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)
# paginator= Paginator(posts,10)
# page_number = request.GET.get('page')
# page_obj=paginator.get_page(page_number)

# tags = Tag.objects.all
# groups = Group.objects.all
#
# form1 = SearchForm(request.POST)
# context = {
# 'posts' : posts,
# 'groups' : groups,
# 'tags' : tags,
# 'form' : form1,
# 'page_obj':page_obj,
# }
# if request.user.is_authenticated:
#     aposts = posts.filter(tags__name__in=official_tag).filter(tags__in=request.user.profile.tags.all()).distinct()
#     paginator = Paginator(aposts,10)
#     aposts = paginator.get_page(request.GET.get('page'))
#     context['aposts'] = aposts
# return render(request, 'Post/home.html', context)
# else:
#     return render(request,'intro.html')

# class PostDetailView(LoginRequiredMixin,DetailView):
#     model = Post
#     def get_context_data(self, **kwargs):
#         # Call the base implementation first to get a context
#         context = super().get_context_data(**kwargs)
#         is_liked = False
#         if (self.object.likers.filter(username = self.request.user.username).exists()):
#             is_liked = True
#         else:
#             is_liked = False
#         post = self.object
#         if not self.request.user in self.object.views.all() and self.request.user.is_authenticated:
#             self.object.views.add(self.request.user)
#         # Add in a QuerySet of all the books
#         options = PollChoice.objects.filter(poll=self.object)
#         uchoice = ''
#         total = 0
#
#         vpost = VideoPost.objects.filter(id=post.id).first
#
#         # print(vpost[0].video.url)
#
#         for index, op in enumerate(options):
#             total = total + op.voters.count()
#             if self.request.user in op.voters.all():
#                 uchoice=op
#         context['uchoice']=uchoice
#         context['total']=total
#         context['vpost']=vpost
#         context['options']=options
#         context['poll']=self.object
#         context['comments'] = Comment.objects.filter(post = self.object)
#         context['is_liked'] = is_liked
#         context['post']  = post
#         context['tags'] = post.tags.all
#         return context
# @login_required
# def postDetailModel(request,id):


# def postcreate(request,type):
#     # print(type)
#     if(request.method=='POST'):
#         if type=='0':
#             form =PostCreateFrom(request.POST,user=request.user)
#         else:
#             form = VideoCreateForm(request.POST,request.FILES,user=request.user)
#         if(form.is_valid()):
#             form.instance.author=request.user
#             form.instance.type=type
#             form.save()
#             return redirect('blog-home')
#     else:
#         if type=='0':
#             form=PostCreateFrom(user=request.user)
#         else:
#             form=VideoCreateForm(user=request.user)
#     context={'form':form}
#     return render(request, 'Post/post_form.html', context)
#
# @login_required
# def GroupPostCreateView(request,channel,slug):
#         if(request.method == 'POST'):
#             form1 = GroupPostCreateForm(request.POST,user=request.user)
#             if(form1.is_valid()):
#                 group = Group.objects.get(slug = slug)
#                 form1.instance.parentchannel = Channel.objects.get(parentgroup = group, name = channel)
#                 form1.instance.author = request.user
#                 form1.save()
#                 return redirect(group.get_channel_url(channel))
#         else:
#             form1 = GroupPostCreateForm(user=request.user)
#         context = {
#             'form': form1,
#             # 'user':request.user
#         }
#         return render(request, 'Post/post_form.html', context)
#
# @login_required
# def commentFunc(request,pk):
#     if (request.method=='POST'):
#         the_content = request.POST.get('the_content')
#         com=Comment(content=the_content,post=Post.objects.filter(pk = pk).first(),author=request.user)
#         com.save()
#         # a['job']="done"
#         return HttpResponse("helo")
#
# class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     model = Post
#     form_class = PostUpdateFrom
#
#     def get_form_kwargs(self):
#         kwargs=super().get_form_kwargs()
#         kwargs.update({'user':self.request.user})
#         return kwargs
#
#     def form_valid(self, form):
#         form.instance.author = self.request.user
#         return super().form_valid(form)
#
#     def test_func(self):
#         post = self.get_object()
#         return (self.request.user == post.author)
#
#
# class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
#     model = Post
#     success_url = '/'
#
#     def test_func(self):
#         post = self.get_object()
#         if self.request.user == post.author:
#             return True
#         return False
#
# @login_required
# def likepost(request):
#     post = get_object_or_404(Post, id = request.POST.get('id'))
#     is_liked = False
#     if (post.likers.filter(username = request.user.username).exists()):
#         post.likers.remove(request.user)
#         is_liked = False
#     else:
#         post.likers.add(request.user)
#         is_liked = True
#
#     context = {
#         'is_liked' : is_liked,
#         'post' : post
#     }
#     html = render_to_string('Post/like-section.html',context, request = request)
#     return JsonResponse({'form':html})
#
# @login_required
# def ExploreTagView(request, tag):
#     posts = Post.objects.filter(tags__name = tag).filter(grouppost__isnull=True)
#     context = {
#         'posts': posts,
#         'tag': tag,
#     }
#     return render(request, 'Post/explore-tag.html', context)
#
# @login_required
# def GroupPollNew(request,channel,slug):
#     if request.method == 'GET':
#         pollform = GroupPostCreateForm(request.POST,user=request.user)
#         formset = PollChoiceFormset(queryset=PollChoice.objects.none())
#     elif request.method == 'POST':
#         pollform = GroupPostCreateForm(request.POST,user=request.user)
#         formset = PollChoiceFormset(request.POST)
#         if pollform.is_valid() and formset.is_valid():
#             group = Group.objects.get(slug = slug)
#             pollform.instance.parentchannel = Channel.objects.get(parentgroup = group, name = channel)
#             pollform.instance.author = request.user
#             pollform.save()
#             poll = pollform.save(commit=False)
#             poll.save()
#             id = poll.pk
#             for form in formset:
#                 pollob = form.save(commit=False)
#                 if pollob.option=='':
#                     continue
#                 pollob.poll = poll
#                 pollob.save()
#         return redirect(group.get_channel_url(channel))
#     return render(request,'Post/poll.html',{'pollform':pollform,'formset':formset})
#
# @login_required
# def pollnew(request):
#     if request.method == 'GET':
#         pollform = PostCreateFrom(request.GET or None, user = request.user)
#         formset = PollChoiceFormset(queryset=PollChoice.objects.none())
#     elif request.method == 'POST':
#         pollform = PostCreateFrom(request.POST, user = request.user)
#         formset = PollChoiceFormset(request.POST)
#         if pollform.is_valid() and formset.is_valid():
#             poll = pollform.save(commit=False)
#             poll.author = request.user
#             poll.save()
#             id = poll.pk
#             for form in formset:
#                 pollob = form.save(commit=False)
#                 if pollob.option=='':
#                     continue
#                 pollob.poll = poll
#                 pollob.save()
#         return redirect('post-detail',pk=id)
#     return render(request,'Post/poll.html',{'pollform':pollform,'formset':formset})
#
# @login_required
# def addpoll(request,pk,pollid):
#     option = PollChoice.objects.get(pk=pk)
#     option.voters.add(request.user)
#     option.save()
#     return redirect('post-detail',pk=pollid)
#
# @login_required
# def Search(request):
#     searchstring = request.POST.get('searchterm')
#     users = User.objects.filter(username__icontains = searchstring)
#     groupse = Group.objects.filter(title__icontains = searchstring)
#     posteys = Post.objects.filter(title__icontains = searchstring).filter(grouppost__isnull=True)
#     form1 = SearchForm(request.POST)
#     context = {
#         'users' : users,
#         'form' : form1,
#         'posteys' : posteys,
#         'groupse' : groupse,
#     }
#     html = render_to_string('Post/searchresults.html',context, request = request)
#     return JsonResponse({'form':html})
