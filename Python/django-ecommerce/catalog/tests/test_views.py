from django.test import TestCase, Client
from django.core.urlresolvers import reverse

from model_mommy import mommy

from catalog.models import Category, Product


class ProductListTestCase(TestCase):
    
    def setUp(self):
        self.url = reverse('catalog:product_list')
        mommy.make('catalog.Product', _quantity=10)

    def tearDown(self):
        Product.objects.all().delete()
    
    def test_view_ok(self):
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'catalog/product_list.html')

    def test_context(self):
        response = self.client.get(self.url)
        self.assertTrue('product_list' in response.context)
        product_list = response.context['product_list']
        self.assertEquals(len(product_list), 3)
        paginator = response.context['paginator']
        self.assertEquals(paginator.num_pages, 4)
    
    def test_page_not_found(self):
        response = self.client.get('{}?page=5'.format(self.url))
        self.assertEquals(response.status_code, 404)


