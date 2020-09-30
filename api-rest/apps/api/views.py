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
    input_site = request.GET.get('site_name') or Value('null')
    input_category = request.GET.get('category_id')

    sitio = request.GET.get('site')
    categorias = request.GET.get('category_id')
    fecha_inicio = request.GET.get('start_date')
    fecha_fin = request.GET.get('end_date')

    # Case 1: Site, no category, no date
    # if sitio and not categorias and not fecha_inicio and not fecha_fin:
    
    # Case 2: Site, category, no date
    # if sitio and categorias and not fecha_inicio and not fecha_fin:
    
    # Case 3: Site, date, no category
    # if sitio and not categorias and not fecha_inicio and not fecha_fin:
    # Case 4: Site, category, date

    # Case 5: Category, no site, no date
    # Case 6: Category, site, no date
    # Case 7: Category, date, no site
    # Case 8: Category, site, date

    # Case 9: Date, no site, no category
    # Case 10: Date, site, no category
    # Case 11: Date, category, no site
    # Case 12: Date, site, category

    start_date = timezone.datetime.fromtimestamp(int(request.GET.get('start_date')))
    end_date   = timezone.datetime.fromtimestamp(int(request.GET.get('end_date')))


    # screenshots = Screenshot.objects.filter(
    #     Q(tracked_site__site_id__title__icontains = input_site) 
    #     | Q(created__gte=start_date, created__lte=end_date)
    #     | Q(tracked_site__category_id__id=input_category)
    #     ).order_by('id')[skip:(skip+amount)]

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