from django.db import models

"""Модель для добавления книг"""


class Book(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name='Название книги'
    )
    cover = models.ImageField(
        upload_to='uploads/images/',
        verbose_name='Обложка книги',
        blank=False,
    )

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def __str__(self):
        return self.title


"""Модель для добавления рейтинга внутри книжной полки"""


class BookShelRating(models.Model):
    title = models.CharField(
        verbose_name='Наименование рейтинга',
        max_length=64,
        null=True,
        blank=True
    )

    books = models.ManyToManyField('Book', related_name='bookshelf_rating', blank=True)

    weight = models.PositiveSmallIntegerField(
        verbose_name='Вес кейса',
        default=0,
        help_text='Необязательный параметр. Чем выше вес рейтинга тем выше он в списке'
    )

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинги'
        ordering = ['-weight']

    def __str__(self):
        return self.title


"""Модель для добавления библиотеки"""


class Library(models.Model):
    title = models.CharField(
        verbose_name='Библиотека',
        max_length=128,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'Библиотека'
        verbose_name_plural = 'Библиотеки'

    def __str__(self):
        return self.title


"""Модель для добавления книжной полки"""


class BookShelf(models.Model):
    title = models.CharField(
        verbose_name='Название полки',
        max_length=64,
        null=True,
        blank=True
    )

    library = models.ForeignKey(
        Library,
        null=True,
        blank=True,
        verbose_name='Библиотека',
        related_name='bookshelves',
        on_delete=models.CASCADE,
    )

    bookshelf_rating = models.ManyToManyField('Book', related_name='Book', blank=True)

    class Meta:
        verbose_name = 'Полка'
        verbose_name_plural = 'Полки'

    def __str__(self):
        return self.title
