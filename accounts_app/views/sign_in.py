from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate
from django.utils.translation import gettext as _


from accounts_app.forms import SignInForm


def sign_in(request: HttpRequest) -> HttpResponse:
    if request.method == "GET":
        if request.user.is_authenticated:
            return redirect("home")

        form = SignInForm()
        return render(request, "accounts_app/sign_in.html", {"form": form})

    elif request.method == "POST":
        form = SignInForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)
                return redirect(request.GET.get("next", "/"))

        messages.error(request, _("Invalid email or password"))
        return render(request, "accounts_app/sign_in.html", {"form": form})
