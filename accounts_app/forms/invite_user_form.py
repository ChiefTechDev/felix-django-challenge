from django import forms


class InviteUserForm(forms.Form):
    email = forms.EmailField(max_length=65, required=True)