from .models import User  
from django.core.mail import send_mail
from django.conf import settings

def send_emails_to_users():
    subject = 'Subject of the email'
    message = 'Message body of the email.'
    from_email = settings.EMAIL_HOST_USER
    user_emails = User.objects.values_list('email', flat=True)

    for email in user_emails:
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)

def send_appointment_confirmation_email(appointment):
    subject = 'Appointment Confirmation'
    message = 'Your appointment has been booked successfully.'
    from_email = settings.EMAIL_HOST_USER  # Use your email address

    # Get the user's email from the appointment
    user_email = appointment.user.email

    # Send the email to the user
    send_mail(subject, message, from_email, [user_email])
