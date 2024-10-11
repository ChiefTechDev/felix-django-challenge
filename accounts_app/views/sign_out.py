from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import logout


def sign_out(request: HttpRequest) -> HttpResponse:
    logout(request)
    return redirect("sign_in")
