from django.db import models
from django.conf import settings

from catalog.models import Product

from pagseguro import PagSeguro

# Create your models here.

class CartItemManager(models.Manager):
    
    def add_item(self, cart_key, product):
        
        if self.filter(cart_key=cart_key, product=product).exists():
            cart_item = self.get(cart_key=cart_key, product=product)
            cart_item.quantity += 1
            cart_item.save()
            created = False
        else:
            cart_item = CartItem.objects.create(cart_key=cart_key, product=product, price=product.price)
            created = True

        return cart_item, created

class CartItem(models.Model):

    cart_key = models.CharField('Chave do Carrinho', max_length=40, db_index=True)
    product = models.ForeignKey('catalog.Product', verbose_name='Produto')
    quantity = models.PositiveIntegerField('Quantidade', default=1)
    price = models.DecimalField('Preço', decimal_places=2, max_digits=8)

    objects = CartItemManager()

    class Meta:
        verbose_name = 'Item do Carrinho'
        verbose_name_plural = 'Itens do Carrinho'
        unique_together = (('cart_key', 'product'))

    def __str__(self):
        return '{} [{}]'.format(self.product, self.quantity)


class OrderManager(models.Manager):
    
    def create_order(self, user, cart_itens):
        order = self.create(user=user)
        for cart_item in cart_itens:
            order_item = OrderItem.objects.create(order=order, quantity=cart_item.quantity, product=cart_item.product, price=cart_item.price)
        return order


class Order(models.Model):

    STATUS_CHOICES = (
        (0, 'Aguardando Pagamento'),
        (1, 'Concluída'),
        (2, 'Cancelada'),
    )

    PAYMENT_OPTION_CHOICES = (
        ('deposit', 'Depósito'),
        ('pagseguro', 'PagSeguro'),
        ('paypal', 'Paypal'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário')
    status = models.IntegerField('Situação', choices=STATUS_CHOICES, default=0, blank=True)
    payment_option = models.CharField('Opção de pagamento', choices=PAYMENT_OPTION_CHOICES, max_length=10, default='deposit')
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Alterado em', auto_now=True)

    objects = OrderManager()

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return 'Pedido #{}'.format(self.pk)

    def products(self):
        products_id = self.itens.values_list('product')
        return Product.objects.filter(pk__in=products_id)

    def total(self):
        aggregation_function = models.Sum( models.F('price') * models.F('quantity'), output_field=models.DecimalField() )
        return self.itens.aggregate(total=aggregation_function)['total']


    def pagseguro(self):
        pg = PagSeguro(
            email=settings.PAGSEGURO_EMAIL,
            token=settings.PAGSEGURO_TOKEN,
            config={ 'sandbox': settings.PAGSEGURO_SANDBOX }
        )
        pg.sender = {
            'email': self.user.email
        }
        pg.reference_prefix = None
        pg.shipping = None
        pg.reference = self.pk
        for item in self.itens.all():
            pg.itens.append(
                {
                    'id': item.product.pk,
                    'description': item.product.name,
                    'quantity': item.quantity,
                    'amount': '%.2f' % item.price
                }
            )
        return pg

    def pagseguro_update_status(self, status):
        if status == '3':
            self.status = 1
        elif status == '7':
            self.status = 2
        self.save()

class OrderItem(models.Model):
    
    order = models.ForeignKey(Order, verbose_name='Pedido', related_name='itens')
    product = models.ForeignKey('catalog.Product', verbose_name='Produto')
    quantity = models.PositiveIntegerField('Quantidade', default=1)
    price = models.DecimalField('Preço', decimal_places=2, max_digits=8)

    class Meta:
        verbose_name = 'Item do pedido'
        verbose_name_plural = 'Itens do pedido'

    def __str__(self):
        return '[{}] {}'.format(self.order, self.product)


def post_save_cart_item(instance, **kwargs):
    if instance.quantity < 1:
        instance.delete()

models.signals.post_save.connect(post_save_cart_item, sender=CartItem, dispatch_uid='post')
