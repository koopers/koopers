# Forms
from django import forms
from django.contrib.auth.forms import UserCreationForm

# Models
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm, forms.ModelForm):
    username = forms.EmailField(max_length=50, required=True)
    is_admin = forms.BooleanField(required=False)
    class Meta:
        model = User
        fields = ('username','first_name','last_name','password1','password2', 'is_admin')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Las contraseñas no coinciden')
        return password2