from django.contrib import admin
from .models import User,Specialty,HealthcareProvider,CustomUser

admin.site.register(User)
admin.site.register(Specialty)
admin.site.register(HealthcareProvider)
admin.site.register(CustomUser)

 