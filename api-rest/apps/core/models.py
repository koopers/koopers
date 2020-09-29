from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.utils.text import slugify
import os

# Create your models here.

class Category(models.Model):
    """Model definition for Category."""
    title = models.CharField(max_length=50)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)
    class Meta:
        """Meta definition for Category."""
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)
    def __str__(self):
        """Unicode representation of Category."""
        return self.title

class SuggestedSite(models.Model):
    """Model definition for SuggestedSite."""
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    categories = models.CharField(max_length=200)
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)
    class Meta:
        """Meta definition for SuggestedSite."""
        verbose_name = 'SuggestedSite'
        verbose_name_plural = 'SuggestedSites'
    def __str__(self):
        """Unicode representation of SuggestedSite."""
        return self.title

class Site(models.Model):
    """Model definition for Site."""
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    available = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)
    class Meta:
        """Meta definition for Site."""
        verbose_name = 'Site'
        verbose_name_plural = 'Sites'
    def __str__(self):
        """Unicode representation of Site."""
        return self.title

class TrackedSite(models.Model):
    """Model definition for TrackedSite."""
    site_id = models.ForeignKey(Site, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    path_url = models.CharField(max_length=200)
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)
    class Meta:
        """Meta definition for TrackedSite."""
        verbose_name = 'TrackedSite'
        verbose_name_plural = 'TrackedSites'
    def __str__(self):
        """Unicode representation of TrackedSite."""
        return '{0} - {1}'.format(self.site_id,self.category_id,self.path_url)

def upload_screenshot(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'schreenshots/{0}/{1}%Y%m%d{2}'.format(instance.tracked_site, filename_base, filename_ext)

class Screenshot(models.Model):
    """Model definition for Screenshot."""
    
    tracked_site = models.ForeignKey(TrackedSite, on_delete=models.CASCADE)
    mobile_url = models.CharField(max_length=255, blank=True, null=True)
    tablet_url = models.CharField(max_length=255, blank=True, null=True)
    desktop_url = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)

    class Meta:
        """Meta definition for Screenshot."""
        verbose_name = 'Screenshot'
        verbose_name_plural = 'Screenshots'
    def __str__(self):
        """Unicode representation of Screenshot."""
        return self.tracked_site