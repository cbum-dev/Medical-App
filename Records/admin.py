from django.contrib import admin
from .models import Appointment,RescheduleHistory,HealthcareRecord

admin.site.register(Appointment)
admin.site.register(RescheduleHistory)
admin.site.register(HealthcareRecord)
# Register your models here.
