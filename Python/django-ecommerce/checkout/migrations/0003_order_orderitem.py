# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-19 20:39
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0003_auto_20171103_2212'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('checkout', '0002_auto_20171118_2022'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(blank=True, choices=[(0, 'Aguardando Pagamento'), (1, 'Concluída'), (2, 'Cancelada')], default=0, verbose_name='Situação')),
                ('payment_option', models.CharField(choices=[('pagseguro', 'PagSeguro'), ('paypal', 'Paypal')], max_length=10, verbose_name='Opção de pagamento')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='Alterado em')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuário')),
            ],
            options={
                'verbose_name': 'Pedido',
                'verbose_name_plural': 'Pedidos',
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1, verbose_name='Quantidade')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Preço')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='itens', to='checkout.Order', verbose_name='Pedido')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.Product', verbose_name='Produto')),
            ],
            options={
                'verbose_name': 'Item do pedido',
                'verbose_name_plural': 'Itens do pedido',
            },
        ),
    ]
