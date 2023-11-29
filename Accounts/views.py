from rest_framework import generics
from .models import User, HealthcareProvider,CustomUser,Specialty
from .serializers import UserSerialiser, HealthcareProviderSerializer,SpecialtySerializer,CustomUserSerialiser
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
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthcareProviderBySpecialtyView(APIView):
    def get(self, request, specialty_id):
        try:
            specialty = Specialty.objects.get(pk=specialty_id)
            providers = HealthcareProvider.objects.filter(speciality=specialty)
            serializer = HealthcareProviderSerializer(providers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Specialty.DoesNotExist:
            return Response({"error": "Specialty not found"}, status=status.HTTP_404_NOT_FOUND)


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
# from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework.status import HTTP_201_CREATED
# from .serializers import UserRegistrationSerializer

# class UserRegistrationView(generics.CreateAPIView):
#     serializer_class = UserRegistrationSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
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


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_role(request):
    user = request.user

    if hasattr(user, 'healthcareprovider'):
        role = 'healthcare_provider'
    elif hasattr(user, 'user'):
        role = 'normal_user'
    else:
        role = 'unknown'

    return Response({'role': role})



#################################KKKKKKKKKKKKKKKKKKKKK
# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, HealthcareProvider, User
from .serializers import ACustomUserSerializer,AUserSerializer,AHealthcareProviderSerializer
class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = ACustomUserSerializer
class BasicUserRegistration(generics.CreateAPIView):
    queryset = HealthcareProvider.objects.all()
    serializer_class = AUserSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = self.request.user
        print(user.id)
        if user.is_authenticated:
            serializer.save(user=user)
        else:   pass

class ProviderRegistration(generics.CreateAPIView):
    queryset = HealthcareProvider.objects.all()
    serializer_class = AHealthcareProviderSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = self.request.user
        print(user.id)
        if user.is_authenticated:
            serializer.save(user=user)
        else: pass


class SpecialityView(APIView):
    def get(self, request):
        specialties = Specialty.objects.all()
        serializer = SpecialtySerializer(specialties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
