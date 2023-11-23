from rest_framework import generics
from Accounts.permissions import IsOwner
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Blog,BlogLike
from .serializer import BlogCreateSerializer,BlogSerializer,BlogLikeSerializer,BlogUpdateSerializer,FullBlogSerializer
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
class BlogCreate(generics.CreateAPIView):
    serializer_class = BlogCreateSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

class BlogUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()                                                                                           
    serializer_class = BlogUpdateSerializer
    permission_classes = [IsAuthenticated,IsOwner]
    

class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class BlogLikeViewSet(viewsets.ModelViewSet):
    queryset = BlogLike.objects.all()
    serializer_class = BlogLikeSerializer

# class BlogDetailView(generics.RetrieveAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer

#     def get(self, request, *args, **kwargs):
#         # Check some condition to determine whether to show full content
#         show_full_content = request.query_params.get('show_full_content', False)

#         serializer = self.get_serializer(self.get_object(), context={'show_full_content': show_full_content})
#         return Response(serializer.data)


class FullBlog(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = FullBlogSerializer
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
