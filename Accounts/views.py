from rest_framework import generics
from .models import User, HealthcareProvider,CustomUser
from .serializers import UserSerialiser, HealthcareProviderSerializer,HealthcareProviderListBySpecialty,CustomUserSerialiser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwner
from rest_framework.permissions import IsAuthenticated


class UserListCreateView(generics.ListCreateAPIView):
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer
    


class HealthcareProviderListCreateView(generics.ListCreateAPIView):
    serializer_class = HealthcareProviderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Check if 'pk' (primary key) is present in the URL parameters
        provider_id = self.kwargs.get('pk')

        if provider_id:
            # Return a single provider if 'pk' is present
            return HealthcareProvider.objects.filter(pk=provider_id)
        else:
            # Return all providers if 'pk' is not present
            return HealthcareProvider.objects.all()
class NHealthcareProviderListBySpecialty(generics.ListAPIView):
    serializer_class = HealthcareProviderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        specialty = self.request.query_params.get('specialty')
        queryset = HealthcareProvider.objects.filter(speciality__name=specialty)

        return queryset

class HealthcareProviderUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class UserRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated, IsOwner]


class CustomUserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerialiser


# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from .serializers import RegistrationSerializer

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)



# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from .serializers import UserRegistrationSerializer

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import SessionAuthentication
User = get_user_model()
from rest_framework import permissions, status

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if user and check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            response = Response()
            response.set_cookie(key='jwt', value=str(access_token), httponly=True)
            
            response.data = {
                'access_token': str(access_token),
                'refresh_token': str(refresh),
            }
            return response
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



import json
from jose import jwt
from django.http import JsonResponse

def get_user_id_from_jwt(jwt_token, secret_key):
    try:
        # Decode the JWT token
        decoded_token = jwt.decode(jwt_token, secret_key, algorithms=['HS256'])
        # Assuming the user ID is stored in the 'user_id' claim of the JWT
        user_id = decoded_token.get('user_id')
        return user_id
    except jwt.ExpiredSignatureError:
        # Handle token expiration
        return None
    except jwt.DecodeError:
        # Handle other JWT errors
        return None
    

from .serializers import LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime

from django.http import JsonResponse

def some_protected_view(request):
    # Retrieve the 'jwt' cookie from the request.COOKIES dictionary
    jwt_cookie = request.COOKIES.get('jwt')
    secret_key = 'your_secret_key'  # Replace with your actual secret key

    if jwt_cookie:
        # Extract user ID from the JWT
        user_id = get_user_id_from_jwt(jwt_cookie, secret_key)

        if user_id:
            # User ID is successfully retrieved
            return JsonResponse({'user_id': user_id})
        else:
            # Failed to decode JWT or handle expiration
            return JsonResponse({'error': 'Invalid or expired token'}, status=401)
    else:
        # If 'jwt' cookie is not present, return an error response
        return JsonResponse({'error': 'Unauthorized'}, status=401)
class LogoutView(APIView):
        permission_classes = (IsAuthenticated,)     
        def post(self, request):
            try:               
                refresh_token = request.data["refresh_token"]               
                token = RefreshToken(refresh_token)
                token.blacklist()               
                return Response(status=status.HTTP_205_RESET_CONTENT)          
            except Exception as e:               
                return Response(status=status.HTTP_400_BAD_REQUEST)
class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )   
   def get(self, request):
        user = request.user
        content = {'message': user.id}   
        return JsonResponse(content)
