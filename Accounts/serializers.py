from rest_framework import serializers
from .models import HealthcareProvider
from rest_framework import generics
from rest_framework import serializers
from .models import HealthcareProvider, Specialty,User,CustomUser

class CustomUserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
class HealthcareproviderSerialiser(serializers.ModelSerializer):
    class Meta:
        model = HealthcareProvider
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
    speciality = SpecialtySerializer(many=True)  # Serialize the specialties

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
