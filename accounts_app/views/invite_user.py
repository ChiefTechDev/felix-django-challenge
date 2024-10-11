from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from accounts_app.forms import InviteUserForm
from accounts_app.models import UserInvitation


class InviteUserView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        # This would be the view where the invited user can join.
        # Here we have to check if the provided token points to an invitation which is valid and not expired.
        ...

    def post(self, request, *args, **kwargs):
        form = InviteUserForm(request.POST)
        
        if form.is_valid():
            # We could further improve this here to first check if an invitation for this email already exists and is not expired
            UserInvitation.objects.filter(email=form.cleaned_data["email"]).delete()

            invitation = UserInvitation(email=form.cleaned_data["email"], invited_by=request.user)
            invitation.save()

            invitation.send_invitation_email()

            return render(request, "accounts_app/profile.html", {"invite_user_form": form, "invited": True})
        else:
            return render(request, "accounts_app/profile.html", {"invite_user_form": form})