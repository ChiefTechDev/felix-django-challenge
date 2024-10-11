from django.contrib import admin

from accounts_app.models import User, UserInvitation

admin.site.register(User)
admin.site.register(UserInvitation)