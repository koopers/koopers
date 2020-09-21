from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.utils.text import slugify
import os
# Create your models here.

class Profile(models.Model):
    """Model definition for Profile."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        """Meta definition for Profile."""
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
    def __str__(self):
        """Unicode representation of Profile."""
        return self.user

class Category(models.Model):
    """Model definition for Category."""
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        """Meta definition for Site."""
        verbose_name = 'Site'
        verbose_name_plural = 'Sites'
    def __str__(self):
        """Unicode representation of Site."""
        pass

class TrackedSite(models.Model):
    """Model definition for TrackedSite."""
    site_id = models.ForeignKey(Site, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    path_url = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        """Meta definition for TrackedSite."""
        verbose_name = 'TrackedSite'
        verbose_name_plural = 'TrackedSites'
    def __str__(self):
        """Unicode representation of TrackedSite."""
        pass

def upload_screenshot(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'schreenshots/{0}/{1}%Y%m%d{2}'.format(instance.tracked_site, filename_base, filename_ext)
class Screenshot(models.Model):
    """Model definition for Screenshot."""
    tracked_site = models.ForeignKey(TrackedSite, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to=upload_screenshot)
    title = models.CharField(max_length=200)
    screen_size = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        """Meta definition for Screenshot."""
        verbose_name = 'Screenshot'
        verbose_name_plural = 'Screenshots'
    def __str__(self):
        """Unicode representation of Screenshot."""
        return self.tracked_site
