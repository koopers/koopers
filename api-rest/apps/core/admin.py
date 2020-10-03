'''
from django.contrib import admin
from .models import * 
# Register your models here.

@admin.register(TrackedSite)
class TrackedSiteAdmin(admin.ModelAdmin):
    pass

@admin.register(Screenshot)
class ScreenShotAdmin(admin.ModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(SuggestedSite)
class SuggestedSiteAdmin(admin.ModelAdmin):
    pass

@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    pass
'''
