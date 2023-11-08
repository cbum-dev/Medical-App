from django.contrib import admin
from .models import Appointment,HealthcareRecord

admin.site.register(Appointment)
admin.site.register(HealthcareRecord)
# Register your models here.
