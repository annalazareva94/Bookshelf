from django.contrib import admin
from .models import Book, BookShelRating, BookShelf, Library

models = [Book, BookShelRating, BookShelf]

for model in models:
    admin.site.register(model)


class BookShelRatingInline(admin.TabularInline):
    model = Book.rating


class BookShelfInline(admin.TabularInline):
    model = BookShelf


class ProductAdmin(admin.ModelAdmin):
    exclude = ('books',)
    inlines = [BookShelRatingInline]


class BookShelfAdmin(admin.ModelAdmin):
    exclude = ('bookshelf_rating',)
    inlines = [BookShelfInline]


@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    inlines = [BookShelfInline]
