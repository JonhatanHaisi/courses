from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^carrinho/adicionar/(?P<slug>[\w_-]+)/$', views.create_cartitem, name='create_cartitem'),
    url(r'^carrinho/$', views.cart_item, name='cart_item'),
    url(r'^finalizar/$', views.checkout, name='checkout'),
    url(r'^finalizar/(?P<pk>\d+)/pagseguro/$', views.pagseguro_view, name='pagseguro_view'),
    url(r'^meus-pedidos/$', views.order_list, name='order_list'),
    url(r'^meus-pedidos/(?P<pk>\d+)/$', views.order_detail, name='order_detail'),
]
