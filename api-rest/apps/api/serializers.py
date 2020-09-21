from rest_framework import serializers
from ..core.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'is_admin', 'updated', 'created']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SuggestedSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestedSite
        fields = '__all__'

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'

class TrackedSerializer(serializers.ModelSerializer):
    site_id = SiteSerializer(many=False)
    category_id = CategorySerializer(many=False)
    class Meta:
        model = TrackedSite
        fields = '__all__'

class ScreenshotSerializer(serializers.ModelSerializer):
    tracked_site = TrackedSerializer(many=False)
    class Meta:
        model = Screenshot
        fields = '__all__'
