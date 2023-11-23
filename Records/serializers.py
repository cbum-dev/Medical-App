from rest_framework import serializers
from .models import Appointment,HealthcareRecord
from Accounts.models import User,HealthcareProvider

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email')
    class Meta:
        model = User
        fields = "__all__"

class ProviderSerializers(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email')
    speciality = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = HealthcareProvider
        fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    healthcare_provider = ProviderSerializers()
    class Meta:
        model = Appointment
        fields = '__all__'

class BookAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['healthcare_provider','appointment_datetime','problem']

class RescheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['appointment-datetime','is_rescheduled']

class AppointmentRescheduleSerializer(serializers.Serializer):
    new_appointment_datetime = serializers.DateTimeField()

class HealthCareRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    healthcare_provider = ProviderSerializers()
    class Meta:
        model = HealthcareRecord
        fields = "__all__"
