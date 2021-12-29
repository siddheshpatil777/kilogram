from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
# from Tag.models import Tag
# from Group.models import Channel
from mptt.models import TreeForeignKey,MPTTModel
# Create your models here.
class Post(models.Model):
	title = models.CharField(max_length=100)
	content = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	views = models.ManyToManyField(User, related_name='post_views', blank = True)
	likers = models.ManyToManyField(User, related_name = 'post_likers', blank = True)
	image = models.ImageField(upload_to='images/',default="images/temp.png")
	# tags = models.ManyToManyField(Tag, related_name = 'tags', blank = True)
	# type = models.IntegerField(default=0)
	# def get_absolute_url(self):
	# 	return reverse('post-detail', kwargs = {'pk':self.pk})
	def __str__(self):
		return self.title

# class GroupPost(Post):
# 	parentchannel = models.ForeignKey(Channel, related_name = "parent_channel", on_delete=models.CASCADE)

class Comment(MPTTModel):
	content = models.TextField()
	date_posted = models.DateTimeField(auto_now_add=True)
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True,blank=True, related_name='children')
	likers = models.ManyToManyField(User, related_name='comment_likers', blank=True)
	# class MPTTMeta:
		# level_attr = 'mptt_level'
		# order_insertion_by = ['order']

#
# 	def get_absolute_url(self):
# 		return reverse('post-detail', kwargs = {'pk':self.post.pk})

# class Poll(models.Model):
# 	title=models.CharField(max_length=100)
# 	# tags = models.ManyToManyField(Tag, related_name = 'tags', blank = True)
#
# 	def __str__(self):
# 		return self.title

# class PollChoice(models.Model):
# 	poll = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='poll_choice')
# 	option = models.CharField(max_length=100,blank=True,default="")
# 	voters = models.ManyToManyField(User,related_name='voters')
#
# 	def __str__(self):
# 		return self.poll.title + self.option

# def user_directory_path(instance, filename):
#     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return 'videos/user_{0}/{1}'.format(instance.author.id, filename)

# class VideoPost(Post):
# 	# dog=models.TextField(default="")
# 	video=models.FileField(upload_to=user_directory_path)
