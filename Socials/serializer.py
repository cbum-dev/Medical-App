from rest_framework import serializers
from .models import Blog,BlogLike
from Accounts.models import CustomUser



class CustomUserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email']
class BlogLikeSerializer(serializers.ModelSerializer):
    user = CustomUserSerialiser()

    class Meta:
        model = BlogLike
        fields = ['user']

class BlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    # liked_by = BlogLikeSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author','likes_count']

    def get_likes_count(self, obj):
        return obj.likes_count()


