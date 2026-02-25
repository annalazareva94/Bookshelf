from django.urls import path
from .views import BookListAPI


urlpatterns = [
    path('books/', BookListAPI.as_view(), name='api-books'),
]