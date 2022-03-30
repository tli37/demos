from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(React)
admin.site.register(Foods)
admin.site.register(Entry)