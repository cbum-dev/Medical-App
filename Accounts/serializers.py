from rest_framework import serializers
from .models import HealthcareProvider
from rest_framework import generics
from rest_framework import serializers
from .models import HealthcareProvider, Specialty,User

class HealthcareproviderSerialiser(serializers.ModelSerializer):
    class Meta:
        model = HealthcareProvider
        fields = "__all__"
class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = "__all__"

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
