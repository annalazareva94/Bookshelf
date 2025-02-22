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

    def __str__(self):
        return self.title
