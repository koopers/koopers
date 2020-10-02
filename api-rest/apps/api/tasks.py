from __future__ import absolute_import, unicode_literals
from celery.decorators import task
from celery import shared_task
from ..core.models import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import platform
import boto3
import os
from botocore.exceptions import NoCredentialsError
import datetime
import environ
from pyvirtualdisplay import Display

env = environ.Env()
environ.Env.read_env()

ACCESS_KEY = env("ACCESS_KEY")
SECRET_KEY = env("SECRET_KEY")



def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file,ExtraArgs={
                          'ACL': 'public-read'})
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


@task(name="greetins")
def scrapping_website(link,site_id):
    print(link)
    site = TrackedSite.objects.get(pk=site_id)

    
    date=datetime.datetime.now().strftime ("%Y%m%d")
    desktop = {'output': str(site_id) + "-" + date  + '-desktop.png',
                   'width': 1024,
                   'height': 1800}
    tablet = {'output': str(site_id) + "-" + date  + '-tablet.png',
                  'width': 768,
                  'height': 1400}
    mobile = {'output': str(site_id) + "-" + date  + '-mobile.png',
                  'width': 375,
                  'height': 1200}
        
    linkWithProtocol =  str(link)
    display = Display(visible=0, size=(desktop['width'], desktop['height']))
    display.start()
    browser = webdriver.Firefox()
    browser.get(linkWithProtocol)
    browser.save_screenshot(desktop['output'])
    uploaded = upload_to_aws(desktop['output'], 'koopers', desktop['output'])
    if(uploaded):
         os.remove(desktop['output'])
    browser.quit()
    display.stop()

    display = Display(visible=0, size=(tablet['width'], tablet['height']))
    display.start()
    browser = webdriver.Firefox()
    browser.get(linkWithProtocol)
    browser.save_screenshot(tablet['output'])
    uploaded = upload_to_aws(tablet['output'], 'koopers', tablet['output'])
    if(uploaded):
         os.remove(tablet['output'])
    browser.quit()
    display.stop()
	
    display = Display(visible=0, size=(mobile['width'], mobile['height']))
    display.start()
    browser = webdriver.Firefox()
    browser.get(linkWithProtocol)
    browser.save_screenshot(mobile['output'])
    uploaded = upload_to_aws(mobile['output'], 'koopers', mobile['output'])
    if(uploaded):
         os.remove(mobile['output'])
    browser.quit()
    display.stop()
    

    pref = "https://koopers.s3-sa-east-1.amazonaws.com/"
    mu = pref+mobile['output']
    tu = pref + tablet['output']
    du = pref + desktop['output']

    s = Screenshot(tracked_site=site,mobile_url=mu,tablet_url=tu,desktop_url=du)
    s.save()

    
    
@task(name="get_tracket_sites")
def add_two_numbers():
    '''
    # Get all tracked sites from database and iterate.
    # ...
    # Then, get the full website url (https://example.com/section/ or https://example.com/)
    # And send scrapy task for every website
    section_url = "example.com"
    scrapping_website.delay(section_url)
    return "Some optional message."
    '''
    ts = TrackedSite.objects.all()
    for site in ts:
       scrapping_website.delay(site.path_url,site.id)