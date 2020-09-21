from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..core.models import Profile, Category, SuggestedSite, Site, TrackedSite, Screenshot
from .serializers import ProfileSerializer, CategorySerializer, SuggestedSiteSerializer, SiteSerializer, TrackedSerializer, ScreenshotSerializer
from rest_framework import generics
# Create your views here.

class ListScreenshotView(generics.ListCreateAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

class ScreenshotDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

class ListTrackedSiteView(generics.ListCreateAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer

class TrackedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer

class ListSiteView(generics.ListCreateAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer

class SiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer

class ListSuggestedSiteView(generics.ListCreateAPIView):
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer

class SuggestedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer

class ListCategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListProfileView(APIView):
    def get(self, request):
        profiles = Profile.objects.all()
        data = ProfileSerializer(profiles, many=True).data
        return Response(data)

class ProfileDetailView(APIView):
    def get(self, request, pk):
        profile = get_object_or_404(Profile, pk=pk)
        data = ProfileSerializer(profile).data
        return Response(data)