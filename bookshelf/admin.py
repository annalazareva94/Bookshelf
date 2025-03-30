from django.contrib import admin
from .models import Book, BookShelRating, BookShelf

models = [Book, BookShelRating, BookShelf]

for model in models:
    admin.site.register(model)


class BookShelRatingInline(admin.TabularInline):
    model = BookShelRating.books.through


class BookShelfInline(admin.TabularInline):
    model = BookShelf.bookshelf_rating.through


class ProductAdmin(admin.ModelAdmin):
    exclude = ('books',)
    inlines = [BookShelRatingInline]


class BookShelfAdmin(admin.ModelAdmin):
    exclude = ('bookshelf_rating',)
    inlines = [BookShelfInline]
