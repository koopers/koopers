from django.shortcuts import render
from django.utils import timezone
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
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

class ListTrackedSiteView(generics.ListCreateAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer

class ListSiteView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = Site.objects.all()
    serializer_class = SiteSerializer

class ListSuggestedSiteView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer

class ListCategoryView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated,)
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

@api_view(['GET', 'POST'])
def SearchView(request):

    amount = 10
    page = 0 if not request.GET.get('page') else int(request.GET.get('page'))
    skip = page * amount
    rows = skip + amount

    start_date = timezone.datetime.fromtimestamp(int(request.GET.get('start_date')))
    end_date = timezone.datetime.fromtimestamp(int(request.GET.get('end_date')))
    date = start_date.date()
    screenshots = Screenshot.objects.filter(created__lt=date).values()[skip:(skip+amount)]

    result = []
    for sshot in screenshots:
        aux = {}
        aux['id'] = sshot['id']
        # tsite_id = sshot['tracked_site_id']
        tsite = TrackedSite.objects.get(pk=sshot['tracked_site_id'])
        aux['tracked_site_id'] = {
            'title': tsite.site_id.title,
            'category': tsite.category_id.title
        }
        aux['mobile_url'] = sshot['mobile_url']
        aux['tablet_url'] = sshot['tablet_url']
        aux['desktop_url'] = sshot['desktop_url']
        result.append(aux)

    return Response({
        'message': 'ok',
        # 'results':screenshots
        'result': result
    })

@api_view(['POST'])
def AddScreenshot(request):
    if request.method == 'POST':
        
        url = "https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg"
        tsite = TrackedSite.objects.get(pk=6)
        sshot = Screenshot(tracked_site=tsite, mobile_url=url, tablet_url=url, desktop_url=url)
        sshot.save()
        
        return Response({
            'message':'ok'
        })