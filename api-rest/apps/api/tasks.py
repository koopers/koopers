from __future__ import absolute_import, unicode_literals
from celery.decorators import task
from celery import shared_task
from ..core.models import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import platform




@task(name="greetins")
def scrapping_website(link):
    options = webdriver.ChromeOptions()
    options.add_argument("headless")


    if(platform.system() == 'Linux'):
        options.binary_location = '/usr/bin/chromium-browser'

    options.add_argument("disable-infobars") 
    options.add_argument("--disable-extensions") 
    options.add_argument("--disable-gpu") 
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")

    with webdriver.Chrome(ChromeDriverManager().install(), chrome_options=options) as driver:
   
        desktop = {'output': str(link) + '-desktop.png',
                   'width': 2200,
                   'height': 1800}
        tablet = {'output': str(link) + '-tablet.png',
                  'width': 1200,
                  'height': 1400}
        mobile = {'output': str(link) + '-mobile.png',
                  'width': 680,
                  'height': 1200}
        linkWithProtocol = 'http://' + str(link)

       
        driver.set_window_size(desktop['width'], desktop['height'])
        driver.get(linkWithProtocol)
        time.sleep(2)
        driver.save_screenshot(desktop['output'])
        
         
        driver.set_window_size(tablet['width'], tablet['height'])
        driver.get(linkWithProtocol)
        time.sleep(2)
        driver.save_screenshot(tablet['output'])

        
        driver.set_window_size(mobile['width'], mobile['height'])
        driver.get(linkWithProtocol)
        time.sleep(2)
        driver.save_screenshot(mobile['output'])

    

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
       scrapping_website.delay(site.path_url)