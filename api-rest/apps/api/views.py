from django.shortcuts import render
from django.utils import timezone
from django.db.models import Q
from rest_framework import generics
from .serializers import *
from ..core.models import *
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ListUsersView(generics.ListAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UserDetailView(APIView):
#     permission_classes = (IsAuthenticated,)
#     def get(self, request, pk):
#         user = get_object_or_404(User, pk=pk)
#         data = UserSerializer(user).data
#         return Response(data)

class UserCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # def get(self, request, pk):
    #     permission_classes = (IsAuthenticated,)
    #     queryset = get_object_or_404(User, pk=pk)
    # def delete(self, request, pk):
    #     permission_classes = (IsAuthenticated,)
    #     queryset = User.objects.delete(pk=pk)
    # def put(self, request, pk):
    #     permission_classes = (IsAuthenticated,)
    #     queryset = get_object_or_404(User,pk=pk)


class UserInfoView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {
            'username':request.user.username,
            'admin':request.user.is_staff
        }
        return Response(content)

class ListScreenshotView(generics.ListAPIView):
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

class TrackedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedCGUDSerializer

class CreateTrackedSiteView(generics.CreateAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedCGUDSerializer

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

class LogoutUserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        logout(request)
        content = {
            "message":"You've been logged out succesfully."
        }
        return Response(content)

from django.db.models import Value

@api_view(['GET', 'POST'])
def SearchView(request):

    # page = 0 if not request.GET.get('page') else int(request.GET.get('page'))
    if request.GET.get('page'):
        number = int(request.GET.get('page'))
        if number == 0 or number == 1:
            page = 0
        else:
            page = number - 1
    else:
        page = 0
    
    amount = 10
    skip = page * amount
    rows = skip + amount

    sites = request.GET.get('site_id').split(',')
    categories = request.GET.get('category_id').split(',')

    start_date = None if not request.GET.get('start_date') else timezone.datetime.fromtimestamp(int(request.GET.get('start_date')))
    end_date = None if not request.GET.get('end_date') else timezone.datetime.fromtimestamp(int(request.GET.get('end_date')))


    # Case 1: Site
    if sites and not categories and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site__in=sites).order_by('-created')[skip:(skip+amount)]
    
    # Case 2: Site, category
    elif sites and categories and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site__in=sites, tracked_site__category_id__in=categories).order_by('-created')[skip:(skip+amount)]
    
    # Case 3: Site, date
    elif sites and not categories and start_date and end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site__in=sites, created__range=(start_date, end_date)).order_by('-created')[skip:(skip+amount)]
    
    # Case 4: Site, category, date
    elif sites and categories and start_date and end_date:
        screenshots = Screenshot.objects.filter(
            tracked_site__site__in=sites,
            tracked_site__category_id__in=categories,
            created__range=(start_date, end_date)
            ).order_by('-created')[skip:(skip+amount)]
    
    # Case 5: Category
    elif categories and not sites and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__category_id__in=categories).order_by('-created')[skip:(skip+amount)]
    
    # Case 6: Category, date
    elif categories and not sites and start_date and end_date:
        screenshots = Screenshot.objects.filter(
            tracked_site__category_id__in=categories,
            created__range=(start_date, end_date)
            ).order_by('-created')[skip:(skip+amount)]

    # Case 7: Date
    elif start_date and end_date and not sites and not categories:
        screenshots = Screenshot.objects.filter(created__range=(start_date, end_date)).order_by('-created')[skip:(skip+amount)]
    else:
        screenshots = Screenshot.objects.all().order_by('-created')[skip:(skip+amount)]

    result = ScreenshotSerializer(screenshots, many=True)
    
    return Response({
        'message': 'ok',
        'result': result.data
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