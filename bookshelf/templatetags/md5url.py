import hashlib
import os
import threading

from django.conf import settings
from django import template


register = template.Library()


class UrlCache(object):
    _md5_sum = {}
    _lock = threading.Lock()

    @classmethod
    def get_md5(cls, file_path):
        try:
            return cls._md5_sum[file_path]
        except KeyError:
            with cls._lock:
                try:
                    md5 = cls.calc_md5(os.path.join(settings.STATIC_ROOT, file_path))
                    value = '%s%s?v=%s' % (settings.STATIC_URL, file_path, md5)
                except (IsADirectoryError, FileNotFoundError):
                    value = settings.STATIC_URL + file_path
                cls._md5_sum[file_path] = value
                return value

    @classmethod
    def calc_md5(cls, file_path):
        with open(file_path, 'rb') as fh:
            m = hashlib.md5()
            for chunk in iter(lambda: fh.read(4096), b""):
                m.update(chunk)
            return m.hexdigest()


@register.simple_tag
def md5url(file_path):
    if not settings.DEBUG:
        return UrlCache.get_md5(file_path)
    return settings.STATIC_URL + file_path
