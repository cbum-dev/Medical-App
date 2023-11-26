from rest_framework import serializers
from .models import Blog,BlogLike
from Accounts.models import CustomUser



class CustomUserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username','email']
class BlogLikeSerializer(serializers.ModelSerializer):
    # user = CustomUserSerialiser()
    class Meta:
        model = BlogLike
        exclude = ['user','blog']
class BlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    author = CustomUserSerialiser()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author','likes_count']

    def get_likes_count(self, obj):
        return obj.likes_count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Check a condition (e.g., show_full_content parameter in the context)
        show_full_content = self.context.get('show_full_content', False)
        
        if not show_full_content:
            representation['content'] = ' '.join(representation['content'].split()[:50])
            
        return representation
class BlogCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = ['title','content']
class BlogUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = ['id','title','content']
class FullBlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    author = CustomUserSerialiser()
    class Meta:
        model = Blog
        fields = ['id','title','content','author','likes_count']
    def get_likes_count(self, obj):
        return obj.likes_count()
