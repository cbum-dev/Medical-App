from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Blog,BlogLike
from .serializer import BlogSerializer,BlogLikeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    
class BlogLikeViewSet(viewsets.ModelViewSet):
    queryset = BlogLike.objects.all()
    serializer_class = BlogLikeSerializer
