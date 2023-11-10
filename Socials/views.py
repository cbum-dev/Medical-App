from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Blog,BlogLike
from .serializer import BlogSerializer,BlogLikeSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
class BlogLikeViewSet(viewsets.ModelViewSet):
    queryset = BlogLike.objects.all()
    serializer_class = BlogLikeSerializer
