from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

"""Model for adding books"""


class Book(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name='Book name'
    )
    cover = models.ImageField(
        upload_to='uploads/images/',
        verbose_name='Book cover',
        blank=False,
    )

    general_rating = models.FloatField(
        verbose_name='General rating',
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        default=0,
    )

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

    def __str__(self):
        return self.title


"""Model for adding rating inside book shelf"""


class BookShelRating(models.Model):
    title = models.CharField(
        verbose_name='Rating name',
        max_length=64,
        null=True,
        blank=True
    )

    books = models.ManyToManyField(
        'Book',
        related_name='books'
    )

    weight = models.PositiveSmallIntegerField(
        verbose_name='weight',
        default=0,
        help_text='Unnecessary parameter. The higher weight, the higher rating in the list'
    )

    class Meta:
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'
        ordering = ['-weight']

    def __str__(self):
        return self.title


"""Model for adding book shelf"""


class BookShelf(models.Model):
    title = models.CharField(
        verbose_name='Shelf name',
        max_length=64,
        null=True,
        blank=True
    )

    books = models.ManyToManyField(
        'Book',
        through='ShelfBook',
        related_name='shelves'
    )

    ratings = models.ManyToManyField(
        'BookShelRating',
        blank=True,
        related_name='shelves',
        verbose_name='Available ratings'
    )

    class Meta:
        verbose_name = 'Shelf'
        verbose_name_plural = 'Shelves'

    def __str__(self):
        return self.title


class ShelfBook(models.Model):
    shelf = models.ForeignKey(
        BookShelf,
        on_delete=models.CASCADE
    )

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )

    rating = models.ForeignKey(
        BookShelRating,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    class Meta:
        unique_together = ('shelf', 'book')