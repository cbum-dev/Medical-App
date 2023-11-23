from django.urls import path,include
from .views import BlogCreate,BlogView,BlogUpdate,FullBlog
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'blogs', BlogView, basename='blog')
urlpatterns = [
    path('blogs/create/',BlogCreate.as_view(),name="blogs") ,
    path('', include(router.urls)),
    path('update/<int:pk>/',BlogUpdate.as_view()),
    path('full/<int:pk>/',FullBlog.as_view()),
    # path('full/<int:pk>/',BlogDetailView.as_view())        #Feature
    

]