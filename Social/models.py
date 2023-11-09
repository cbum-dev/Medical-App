from django.db import models
from Accounts.models import CustomUser

# Create your models here.
class Blog(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username
    def likes_count(self):
        return self.bloglike_set.count()
    
class BlogLike(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} likes {self.blog.title}"

    class Meta:
        unique_together = ('user', 'blog')  # Ensures a user can like a blog only once
