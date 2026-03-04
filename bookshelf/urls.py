from django.urls import path
from .views import BookListAPI, BookShelRatingAPI, BookShelfAPI


urlpatterns = [
    path('books/', BookListAPI.as_view(), name='api-books'),
    path('rating/', BookShelRatingAPI.as_view(), name='api-rating'),
    path('shelf/', BookShelfAPI.as_view(), name='shelf-rating'),
]