"""koopers URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
app_name = 'api'

urlpatterns = [
    
    path('add-sshot/', AddScreenshot, name='add-screenshot'),
    path('search/', SearchView, name='search'),
    path('auth/user/', UserInfoView.as_view(), name='user'),
    path('auth/signin/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/signin/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/signup/', UserCreateView.as_view(), name='users-create'),
    path('users/', ListUsersView.as_view(), name='users'),
    path('users/<int:pk>', UserDetailView.as_view(), name='user-detail'),
    path('categories/', ListCategoryView.as_view(), name='categories'),
    path('categories/<int:pk>', CategoryDetailView.as_view(), name='category-detail'),
    path('screenshots/', ListScreenshotView.as_view(), name='screenshots'),
    path('screenshots/<int:pk>', ScreenshotDetailView.as_view(), name='screenshot-detail'),
    path('sites/', ListSiteView.as_view(), name='sites'),
    path('custom-sites/', customSites, name='sites'),
    path('sites/<int:pk>', SiteDetailView.as_view(), name='site-detail'),
    path('site-details/<int:pk>', SiteMoreDetailView, name='site-more-details'),
    path('tracked-sites/', ListTrackedSiteView.as_view(), name='tracked-sites'),
    path('tracked-sites/add/', CreateTrackedSiteView.as_view(), name='tracked-sites-add'),
    path('tracked-sites/<int:pk>', TrackedSiteDetailView.as_view(), name='tracked-site-detail'),
    path('suggested-sites/', ListSuggestedSiteView.as_view(), name='suggested-sites'),
    path('suggested-sites/<int:pk>', SuggestedSiteDetailView.as_view(), name='suggested-site-detail'),
    
    # path('sites/', ListSiteView.as_view(), name='sites'),
    
]
