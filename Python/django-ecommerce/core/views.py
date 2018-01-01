# coding=utf-8
# http://ccbv.co.uk/

""" core views """

from django.shortcuts import render

from django.views.generic import View, TemplateView, CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse_lazy

from .forms import ContactForm

# Create your views here.
#class IndexView(object):
#    
#    def __call__(self, request):
#        return render(request, 'index.html')

class IndexView(TemplateView):
    template_name = 'index.html'

index = IndexView.as_view()


def contact(request):
    """ Contact page """

    form = ContactForm(request.POST or None)
    success = form.send_mail()

    context = { 'form': form, 'success': success }
    return render(request, 'contact.html', context)
