from django.forms import ValidationError
from rest_framework import serializers
from .models import HealthcareProvider
from rest_framework import generics
from rest_framework import serializers
from .models import HealthcareProvider, Specialty,User,CustomUser

class CustomUserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
class UserSerialiser(serializers.ModelSerializer):
    id = serializers.CharField(source='user.id')
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    class Meta:
        model  = User
        fields = ['id','username','name', 'phone', 'email']  
class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = '__all__'

class HealthcareProviderSerializer(serializers.ModelSerializer):
    speciality = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = HealthcareProvider
        fields = '__all__'

class HealthcareProviderListBySpecialty(generics.ListAPIView):
    serializer_class = HealthcareProviderSerializer

    def get_queryset(self):
        specialty_id = self.request.query_params.get('speciality', None)
        if specialty_id is not None:
            queryset = HealthcareProvider.objects.filter(speciality__id=specialty_id)
            return queryset
        
        return HealthcareProvider.objects.exclude()


# serializers.py
from rest_framework import serializers
from .models import CustomUser

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'phone', 'user']
        extra_kwargs = {'user': {'write_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser(**user_data)
        user.set_password(make_password(user_data['password']))
        user.save()
        
        # Now create the associated User
        user_profile = User(user=user, **validated_data)
        user_profile.save()
        return user_profile
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)



# serializers.py
from rest_framework import serializers
from .models import CustomUser, HealthcareProvider, User

class ACustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email','password']

class AHealthcareProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcareProvider
        exclude = ['user']

class AUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'phone', 'about']