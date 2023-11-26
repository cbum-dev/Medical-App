from django.db import models
from Accounts.models import HealthcareProvider,User
from django.utils import timezone

class Appointment(models.Model):
    # app_id = models.AutoField(primary_key=False,default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    healthcare_provider = models.ForeignKey(HealthcareProvider, on_delete=models.CASCADE)
    appointment_datetime = models.DateTimeField()
    is_rescheduled = models.BooleanField(default=False)
    problem = models.TextField(default="Something wrong with my health")
    
    def is_upcoming(self):
        return self.appointment_datetime > timezone.now()

    @property
    def upcoming_appointments(self):
        return Appointment.objects.filter(user=self.user, appointment_datetime__gt=timezone.now())

    

# class RescheduleHistory(models.Model):
#     appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
#     rescheduled_datetime = models.DateTimeField()
def healthcare_record_image_path(instance, filename):
    # This function defines the upload path for the images
    return f'healthcare_records/user_{instance.user}/{filename}'
class HealthcareRecord(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    healthcare_provider = models.ForeignKey(HealthcareProvider, on_delete=models.CASCADE)
    # report = models.ImageField(upload_to=healthcare_record_image_path)
    report = models.FileField(upload_to='pdfs/', default='pdfs/default.pdf')