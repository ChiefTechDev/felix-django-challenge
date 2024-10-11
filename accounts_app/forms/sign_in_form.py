from django import forms


class SignInForm(forms.Form):
    email = forms.EmailField(max_length=65, required=True)
    password = forms.CharField(max_length=65, required=True)