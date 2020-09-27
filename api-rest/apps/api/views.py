from django.shortcuts import render
from django.contrib.auth import logout
from rest_framework import generics
from .serializers import *
from ..core.models import *
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ListScreenshotView(generics.ListCreateAPIView):
    queryset = Screenshot.objects.all().order_by("-created")
    serializer_class = ScreenshotSerializer

class ListTrackedSiteView(generics.ListCreateAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer

class ListSiteView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Site.objects.all()
    serializer_class = SiteSerializer

class ListSuggestedSiteView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer

class ListCategoryView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListUsersView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        profiles = User.objects.all()
        data = UserSerializer(profiles, many=True).data
        return Response(data)

class TrackedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer

class ScreenshotDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

class SiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Site.objects.all()
    serializer_class = SiteSerializer

class SuggestedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        data = ProfileSerializer(user).data
        return Response(data)

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

class UserInfoView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {
            'username':request.user.username,
            'admin':request.user.is_staff
        }
        return Response(content)

class LogoutUserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        logout(request)
        content = {
            "message":"You've been logged out succesfully."
        }
        return Response(content)

class MostRecentCovers(generics.ListAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = MostRecentCoversSerializer

@api_view(['GET'])
def searchCovers(request, pk):
    
    return Response({
        "pk":pk,
        "initial_date": int(request.GET.get("idate")),
        "final_date": int(request.GET.get("fdate")),
    })