from django.test import TestCase
from django.urls import reverse

class SmokeTest(TestCase):
    def test_home_page(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, 200)

# Create your tests here.
