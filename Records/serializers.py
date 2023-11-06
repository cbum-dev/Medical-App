from rest_framework import serializers
from .models import Appointment
from Accounts.models import User,HealthcareProvider

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class ProviderSerializers(serializers.ModelSerializer):
    class Meta:
        model = HealthcareProvider
        fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    healthcare_provider = ProviderSerializers()
    class Meta:
        model = Appointment
        fields = '__all__'

class appser(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['user','healthcare_provider','appointment_datetime']
