from rest_framework import generics
from .models import Appointment,HealthcareRecord
from .serializers import AppointmentSerializer,BookAppSerializer,HealthCareRecordSerializer
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
class AppointmentListCreateView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    def perform_create(self, serializer):
        # Call the serializer's save method to create the appointment
        appointment = serializer.save()

        # Send an email to the user
        subject = 'Appointment Confirmation'
        message = f'Your appointment with {appointment.healthcare_provider.name} on {appointment.appointment_datetime} has been booked successfully.'
        from_email = 'your_email@gmail.com'  # Your email address
        recipient_list = [appointment.user.user.email]  # User's email address

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)


class UserAppointmentsListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.user 
        print(user)
        return Appointment.objects.filter(user=user)
    
class UpcomingAppointmentsView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user.user, appointment_datetime__gt=timezone.now())

class ProviderAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        provider = self.request.user.healthcareprovider 
        print(provider) # Get the healthcare provider associated with the authenticated user
        return Appointment.objects.filter(healthcare_provider=provider)
class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = BookAppSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user.user        
        serializer.save(user=user)

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Appointment
from .serializers import AppointmentRescheduleSerializer
from rest_framework import status
from rest_framework.response import Response

class AppointmentRescheduleView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentRescheduleSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        appointment = self.get_object()

        # Check if the user is the owner of the appointment
        if appointment.user.user != request.user:
            return Response({'detail': 'You are not the owner of this appointment.'}, status=status.HTTP_403_FORBIDDEN)
        if appointment.is_rescheduled == True:
            return Response({'error' :"Appointment is already rescheduled. Make a new appointment."})
        serializer = self.get_serializer(appointment, data=request.data)
        serializer.is_valid(raise_exception=True)

        new_appointment_datetime = serializer.validated_data['new_appointment_datetime']
        appointment.appointment_datetime = new_appointment_datetime
        appointment.is_rescheduled = True
        appointment.save()

        return Response({'detail': 'Appointment rescheduled successfully.'})

class RecordsView(generics.ListCreateAPIView):
    queryset = HealthcareRecord.objects.all()
    serializer_class = HealthCareRecordSerializer
    
