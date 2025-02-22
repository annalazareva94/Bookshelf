from django.shortcuts import render
from django.http import HttpResponse


def greeting(request):
    return HttpResponse('<H2>Здорово, Бандиты!</H2>')

def bookshelf(request):
    return render(request, 'bookshelf/index.html')