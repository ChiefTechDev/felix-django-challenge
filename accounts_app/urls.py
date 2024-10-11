from django.urls import path

from . import views

urlpatterns = [
    path("", views.ProfileView.as_view(), name="home"),
    path("invite-user", views.InviteUserView.as_view(), name="invite_user"),
    path("sign-in", views.sign_in, name="sign_in"),
    path("sign-out", views.sign_out, name="sign_out"),
]
