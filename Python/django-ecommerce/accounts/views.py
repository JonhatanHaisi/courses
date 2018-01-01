from django.shortcuts import render

from django.views.generic import View, TemplateView, CreateView, UpdateView, FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
# for functions: from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm 

from .models import User
from .forms import UserAdminCreationForm

# Create your views here.

class IndexView(LoginRequiredMixin, TemplateView):
    template_name = 'accounts/index.html'

class RegisterView(CreateView):
    form_class = UserAdminCreationForm
    template_name = 'accounts/register.html'
    model = User
    success_url = reverse_lazy('index')

class UpdateUserView(LoginRequiredMixin, UpdateView):

    model = User
    template_name = 'accounts/update_user.html'
    fields = ['name', 'email']
    success_url = reverse_lazy('accounts:index')

    def get_object(self):
        return self.request.user


class UpdatePasswordView(LoginRequiredMixin, FormView):
    
    template_name = 'accounts/update_password.html'
    success_url = reverse_lazy('accounts:index')
    form_class = PasswordChangeForm

    def get_form_kwargs(self):
        kwargs = super(UpdatePasswordView, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

    def form_valid(self, form):
        form.save()
        return super(UpdatePasswordView, self).form_valid(form)

index = IndexView.as_view()
register = RegisterView.as_view()
update_user = UpdateUserView.as_view()
update_password = UpdatePasswordView.as_view()