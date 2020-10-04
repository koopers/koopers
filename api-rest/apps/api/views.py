from django.db.models import Value
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
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserInfoView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {
            'username': request.user.username,
            'admin': request.user.is_staff
        }
        return Response(content)


class ListScreenshotView(generics.ListAPIView):
    queryset = Screenshot.objects.all().order_by(
        '-created', 'tracked_site__category_id')
    serializer_class = ScreenshotSerializer


class ListTrackedSiteView(generics.ListCreateAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedSerializer


class ListSiteView(generics.ListCreateAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer


class ListSuggestedSiteView(generics.ListCreateAPIView):
    queryset = SuggestedSite.objects.all()
    serializer_class = SuggestedSiteSerializer


class ListCategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TrackedSiteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedCGUDSerializer


class CreateTrackedSiteView(generics.CreateAPIView):
    queryset = TrackedSite.objects.all()
    serializer_class = TrackedCGUDSerializer


class ScreenshotDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer


class SiteDetailView(generics.RetrieveUpdateDestroyAPIView):
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
            "message": "You've been logged out succesfully."
        }
        return Response(content)


@api_view(['GET'])
def SearchView(request):

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

    sites = None if not request.GET.get(
        'site_id') else request.GET.get('site_id').split(',')
    categories = None if not request.GET.get(
        'category_id') else request.GET.get('category_id').split(',')

    start_date = None if not request.GET.get(
        'start_date') else timezone.datetime.fromtimestamp(int(request.GET.get('start_date')))
    end_date = None if not request.GET.get(
        'end_date') else timezone.datetime.fromtimestamp(int(request.GET.get('end_date')))

    # Case 1: Site
    if sites and not categories and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site_id__in=sites).order_by(
            '-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 2: Site, category
    elif sites and categories and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site_id__in=sites, tracked_site__category_id__in=categories).order_by(
            '-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 3: Site, date
    elif sites and not categories and start_date and end_date:
        screenshots = Screenshot.objects.filter(tracked_site__site_id__in=sites, created__range=(
            start_date, end_date)).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 4: Site, category, date
    elif sites and categories and start_date and end_date:
        screenshots = Screenshot.objects.filter(
            tracked_site__site_id__in=sites,
            tracked_site__category_id__in=categories,
            created__range=(start_date, end_date)
            ).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 5: Category
    elif categories and not sites and not start_date and not end_date:
        screenshots = Screenshot.objects.filter(tracked_site__category_id__in=categories).order_by(
            '-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 6: Category, date
    elif categories and not sites and start_date and end_date:
        screenshots = Screenshot.objects.filter(
            tracked_site__category_id__in=categories,
            created__range=(start_date, end_date)
            ).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 7: Both Date
    elif start_date and end_date and not sites and not categories:
        screenshots = Screenshot.objects.filter(created__range=(start_date, end_date)).order_by(
            '-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 8: Only start_date
    elif start_date and not end_date and not sites and not categories:
        screenshots = Screenshot.objects.filter(created=start_date).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 8: Only end_date
    elif end_date and not start_date and not sites and not categories:
        screenshots = Screenshot.objects.filter(created=end_date).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 9: Site, start_date
    elif sites and start_date and not categories and not end_date:
        screenshots = Screenshot.objects.filter(created=start_date, 
        tracked_site__site_id__in=sites
        ).order_by('-created', 'tracked_site__category_id')[skip:(skip+amount)]

    # Case 10: Site, Category, start_date
    elif sites and categories and start_date and not end_date:
        screenshots = Screenshot.objects.filter(created=start_date,
        tracked_site__site_id__in=sites,
        tracked_site__category_id__in=categories
        ).order_by('-created','tracked_site__category_id')[skip:(skip+amount)]

    else:
        screenshots = Screenshot.objects.all().order_by('id')[skip:(skip+amount)]

    result=ScreenshotSerializer(screenshots, many=True)

    return Response({
        'message': 'ok',
        'result': result.data
    })

@ api_view(['POST'])
def AddScreenshot(request):
    if request.method == 'POST':

        url= "https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg"
        tsite= TrackedSite.objects.get(pk=6)
        sshot= Screenshot(tracked_site=tsite, mobile_url=url, tablet_url=url, desktop_url=url)
        sshot.save()

        return Response({
            'message': 'ok'
        })

@ api_view(['GET'])
def SiteMoreDetailView(request, pk):
    categories= None
    site= get_object_or_404(Site, pk=pk)
    tsite= TrackedSite.objects.filter(site_id=site)
    data_categories= SiteCategorySerializer(tsite, many=True).data


    return Response({
        'site': {
            'title': site.title,
            'url': site.url,
            'available': site.available,
        },
        'categories': data_categories,
    })
