from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Blog
from .serializer import BlogSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
