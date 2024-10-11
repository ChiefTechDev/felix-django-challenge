from django.test import TestCase
from django.urls import reverse

from accounts_app.models import User


class TestProfileView(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@test.com",
            password="test",
            first_name="John",
            last_name="Doe",
        )
        self.client.force_login(self.user)

    def test_get(self):
        response = self.client.get(reverse("home"))

        self.assertEqual(response.status_code, 200)

        context = response.context
        self.assertEqual(context["user"].first_name, "John")
        self.assertEqual(context["user"].last_name, "Doe")

    def test_post(self):
        response = self.client.post(
            reverse("home"),
            {
                "first_name": "Jane",
                "last_name": "Sample",
            },
        )

        self.assertEqual(response.status_code, 200)

        context = response.context
        self.assertEqual(context["user"].first_name, "Jane")
        self.assertEqual(context["user"].last_name, "Sample")

        # validate no errors in form
        self.assertFalse(context["form"].errors)