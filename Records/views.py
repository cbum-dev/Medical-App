# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Appointment
# from .serializers import AppointmentSerializer,appser
# from rest_framework import generics
# from django.shortcuts import render,redirect
# from .utils import send_appointment_confirmation_email,send_emails_to_users
# from rest_framework import status
# from .models import User  
# from django.core.mail import send_mail
# from django.conf import settings


# @api_view(['POST'])
# def user_appointments(request):
#     serializer = appser(data=request.data)
#     if serializer.is_valid():
#         appointment = serializer.save()
#         formatted_date = appointment.appointment_datetime.strftime('%d-%m-%Y')
#         formated_time = appointment.appointment_datetime.strftime('%H:%M')
#         subject = 'Appointment Confirmation'
#         message = '''Your appointment has been booked successfully.
#         Healthcare_provider = {name}
#         Date = {date}
#         Time = {time}
#         Good Luck.
#         '''.format(name = appointment.healthcare_provider.name,date = formatted_date,time = formated_time)
#         from_email = settings.EMAIL_HOST_USER  # Use your email address
#         user_email = appointment.user.email
#         send_mail(subject, message, from_email, [user_email])
#         # send_appointment_confirmation_email()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class AppointmentList(generics.ListCreateAPIView):
#     queryset = Appointment.objects.filter()
#     serializer_class = AppointmentSerializer

# # views.py
# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from .models import Appointment
# from .serializers import AppointmentSerializer

# class UserAppointmentsView(generics.ListAPIView):
#     serializer_class = AppointmentSerializer
#     # permission_classes = [IsAuthenticated]
#     def get_queryset(self):
#         user = self.kwargs.get('user')
#         return Appointment.objects.filter(user=user)


from rest_framework import generics
from .models import Appointment
from .serializers import AppointmentSerializer
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated

class AppointmentListCreateView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class UserAppointmentsListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.user 
        print(user)
        # Filter appointments based on the user's ID from the bearer token
        return Appointment.objects.filter(user=user)
    
class UpcomingAppointmentsView(generics.ListAPIView):
    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user.user, appointment_datetime__gt=timezone.now())

# class ProviderAppointmentsView(generics.ListAPIView):
#     queryset = Appointment.objects.all()

#     serializer_class = AppointmentSerializer
#     permission_classes = [IsAuthenticated]
#     def get_queryset(self):
#         return Appointment.objects.filter(healthcare_provider = self.request.user.healthcareprovider)

class ProviderAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        provider = self.request.user.healthcareprovider 
        print(provider) # Get the healthcare provider associated with the authenticated user
        return Appointment.objects.filter(healthcare_provider=provider)