"""djangoecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import login, logout

from core.views import index, contact

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^contato/$', contact, name='contact'),
    url(r'^entrar/$', login, { 'template_name': 'login.html' }, name='login'),
    url(r'^sair/$', logout, { 'next_page': 'index' }, name='logout'),
    url(r'^catalogo/', include('catalog.urls', namespace='catalog')),
    url(r'^conta/', include('accounts.urls', namespace='accounts')),
    url(r'^compras/', include('checkout.urls', namespace='checkout')),
    url(r'^admin/', admin.site.urls),
]
