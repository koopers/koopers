from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'koopers.settings')

app = Celery('koopers')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

app.conf.beat_schedule = {
    "add-every-minute-contrab": {
        "task": "get_tracket_sites",
        "schedule": crontab()
    },
    # "add-every-minute-contrab": {
    #     "task": "sum_two_numbers",
    #     "schedule": crontab(),
    #     # "args": (16, 20),
    # },
    # "add-every-5-seconds": {
    #     "task": "multiply_two_numbers",
    #     "schedule": 5.0,  # in seconds
    #     "args": (16, 16),
    # },
}