from rest_framework import serializers
from apps.core.models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ('username','first_name','last_name','email')

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False)
  class Meta:
    model = Profile
    fields = ['id','user','is_admin', 'updated', 'created']

