from django.contrib import admin
from .models import Blog,BlogLike,HelpCenterComment,HelpCenter
admin.site.register(Blog)
admin.site.register(BlogLike)
admin.site.register(HelpCenter)
admin.site.register(HelpCenterComment)
# Register your models here.


