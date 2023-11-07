from rest_framework import generics
from .models import User, HealthcareProvider,CustomUser
from .serializers import UserSerialiser, HealthcareProviderSerializer,HealthcareProviderListBySpecialty,CustomUserSerialiser
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .permissions import IsOwner
from rest_framework.permissions import IsAuthenticated


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerialiser

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