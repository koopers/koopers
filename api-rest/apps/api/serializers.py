from rest_framework import serializers
from ..core.models import *
from django.contrib.auth.models import User

class CustomCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','title']

class CustomSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['id','title','url']

class CustomTrackedSerializer(serializers.ModelSerializer):
    site_id = CustomSiteSerializer(many=False)
    category_id = CustomCategorySerializer(many=False)
    class Meta:
        model = TrackedSite
        fields = ['category_id','path_url','created','site_id']

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id','username', 'password','is_staff','date_joined')
        read_only_fields = ['date_joined','id']
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
    site_id = CustomSiteSerializer(many=False)
    category_id = CustomCategorySerializer(many=False)
    class Meta:
        model = TrackedSite
        fields = '__all__'

class TrackedRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackedSite
        fields = '__all__'
        read_only_fields = ['created','updated']

class ScreenshotSerializer(serializers.ModelSerializer):
    tracked_site = CustomTrackedSerializer(many=False)
    class Meta:
        model = Screenshot
        fields = '__all__'
