import uuid

from django.db import models
from django.core.mail import send_mail
from django.utils import timezone
from django.conf import settings

from .user import User


def get_expiration_datetime():
    return timezone.now() + timezone.timedelta(days=settings.USER_INVITE_EXPIRATION_DAYS)


class UserInvitation(models.Model):
    # Must be a UUID for security reasons. UUID can not be guessed.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(max_length=255, unique=True)
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=get_expiration_datetime)

    def send_invitation_email(self):
        send_mail(
            "You have been invited to join our platform",
            f"Click here to join: { settings.SENDING_DOMAIN }/invite/{self.id}",
            "Kind regards, The Team",
            [self.email],
        )