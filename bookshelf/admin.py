from django.contrib import admin
from .models import Book, BookShelRating, BookShelf, ShelfBook

admin.site.register(Book)
admin.site.register(BookShelRating)


class BookAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_display = ['title', 'id']


class ShelfBookInline(admin.TabularInline):
    model = ShelfBook
    extra = 1
    fields = ['book', 'rating']


class BookShelfAdmin(admin.ModelAdmin):
    filter_horizontal = ['ratings']
    fields = ['title', 'ratings']
    inlines = [ShelfBookInline]


admin.site.register(BookShelf, BookShelfAdmin)
