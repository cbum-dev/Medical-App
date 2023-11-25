from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

class CustomUser(AbstractUser):
    email = models.EmailField()
    # phone = models.CharField(max_length=15,unique=True)
    def __str__(self):
        return self.username
    def set_password(self, raw_password):
        # Hash the raw password using make_password and store it
        self.password = make_password(raw_password)

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if not self.pk:
            self.set_password(self.password)  # Hash password when creating a new user
        super().save(*args, **kwargs)
class Specialty(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class HealthcareProvider(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    # reg_no = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,null=False)
    # email = models.EmailField(null=False,unique=True)
    experience = models.CharField(max_length=100,null=False)
    education = models.CharField(max_length=100,null=False)
    phone = models.CharField(max_length=15,unique=True,null=False)
    address = models.CharField(max_length=100,null=False,default="Not Specified.")
    speciality = models.ManyToManyField(Specialty)
    fees = models.IntegerField(default=1200)
    about = models.TextField(default="Greetings, I am Dr. [Your Name], a dedicated and compassionate healthcare professional with [X] years of experience in [specialty]. Holding a [Degree] from [Institution], my commitment to patient well-being extends beyond diagnosis and treatment. Proficient in [specific skills], I strive for excellence in providing evidence-based care. My passion for [specific area of medicine] is complemented by a patient-centric approach, fostering trust and open communication. With a strong belief in continuous learning, I stay abreast of the latest medical advancements to ensure the highest standard of care. I am honored to contribute to the field of medicine, promoting health and enhancing lives.")

class User(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100,null=False)
    phone = models.CharField(max_length=15,null=False,unique=True)
    about = models.TextField(default="")

