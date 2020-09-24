from __future__ import absolute_import, unicode_literals
from celery.decorators import task
from celery import shared_task


@task(name="greetins")
def scrapping_website(section_url):
    # Here we should do the scrapping for one website
    # and insert it to the database
    return "Hola Germán!"

@task(name="sum_two_numbers")
def add_two_numbers():
    # Get all tracked sites from database and iterate.
    # ...
    # Then, get the full website url (https://example.com/section/ or https://example.com/)
    # And send scrapy task for every website
    section_url = "example.com"
    scrapping_website.delay(section_url)
    return "Some optional message."