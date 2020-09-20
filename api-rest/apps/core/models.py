from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
  """Model definition for Profile."""
  ROLE_CHOICES = [
    ('Administrator', 'Administratorx'),
    ('Maintainer', 'Maintainerx'),
  ]
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  is_admin = models.BooleanField(default=False)
  updated = models.DateTimeField(auto_now=True)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    """Meta definition for Profile."""

    verbose_name = 'Profile'
    verbose_name_plural = 'Profiles'

  def __str__(self):
    """Unicode representation of Profile."""
    pass
