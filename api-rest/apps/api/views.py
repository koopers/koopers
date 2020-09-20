from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.core.models import Profile
from .serializers import ProfileSerializer
# Create your views here.

class ProfileList(APIView):
  def get(self, request):
    profiles = Profile.objects.all()
    data = ProfileSerializer(profiles, many = True)
    return Response(data)

class ProfileDetail(APIView):
  def get(self, request, pk):
    profile = get_object_or_404(Profile, pk=pk)
    data = ProfileSerializer(profile).data
    return Response(data)



