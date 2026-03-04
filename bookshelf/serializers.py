from rest_framework import serializers
from .models import Book, BookShelRating, BookShelf


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BookShelRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookShelRating
        fields = "__all__"


class BookShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookShelf
        fields = "__all__"
