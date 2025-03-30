from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView, DetailView
from django.views.generic.base import ContextMixin
from bookshelf.models import Book, BookShelRating, BookShelf


def greeting(request):
    return HttpResponse('<H2>Здорово, Бандиты!</H2>')

def bookshelf(request):
    return render(request, 'bookshelf/index.html')


class ShelfMixin(ContextMixin):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(self.get_context_product(self.request, **kwargs))
        return context

    def get_context_product(self, request, **kwargs):
        context_product = {
            'all_books_list': Book.objects.all(),
            'book_shelf_rating': BookShelRating.objects.all(),
            'book_shelf_list': BookShelf.objects.all(),
        }
        return context_product


class BookListView(ListView, ShelfMixin):
    model = Book


class BookShelRatingDetailView(DetailView, ShelfMixin):
    model = BookShelRating


class BookShelfDetailView(DetailView, ShelfMixin):
    model = BookShelf

