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
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class HealthcareProviderListBySpecialty(generics.ListAPIView):
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
