from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []