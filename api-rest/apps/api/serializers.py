from rest_framework import serializers
from ..core.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','is_staff', 'date_joined']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self, validated_data):
        user = User(username=validated_data['username'], is_staff=validated_data['is_staff'])
        user.set_password(validated_data['password'])
        user.save()
        return user

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
    # site_id = SiteSerializer(many=False)
    # category_id = CategorySerializer(many=False)
    class Meta:
        model = TrackedSite
        fields = '__all__'

class ScreenshotSerializer(serializers.ModelSerializer):
    tracked_site = TrackedSerializer(many=False)
    
    class Meta:
        model = Screenshot
        fields = '__all__'

class CustomCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']

class CustomTrackedSerializer(serializers.ModelSerializer):
    category_id = CustomCategorySerializer(many=False)
    class Meta:
        model = TrackedSite
        fields = ['category_id']

class MostRecentCoversSerializer(serializers.ModelSerializer):
    tracked_site = CustomTrackedSerializer(many=False)
    class Meta:
        model = Screenshot
        fields = '__all__'