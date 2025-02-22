from django.contrib import admin
from .models import Book


models = [Book]

for model in models:
    admin.site.register(model)
