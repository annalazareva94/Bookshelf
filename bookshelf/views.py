from bookshelf.models import Book, BookShelRating, BookShelf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookSerializer, BookShelRatingSerializer, BookShelfSerializer


class BookListAPI(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookShelRatingAPI(APIView):
    def get(self, request):
        rating = BookShelRating.objects.all()
        serializer = BookShelRatingSerializer(rating, many=True)
        return Response(serializer.data)


class BookShelfAPI(APIView):
    def get(self, request):
        shelf = BookShelf.objects.all()
        serializer = BookShelfSerializer(shelf, many=True)
        return Response(serializer.data)
