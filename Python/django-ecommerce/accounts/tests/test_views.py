from django.test import TestCase, Client
from django.core.urlresolvers import reverse
from django.core import mail
from django.contrib.auth import get_user_model
from django.conf import settings

from model_mommy import mommy

from accounts.models import User

class RegisterViewTestCase(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.register_url = reverse('accounts:register')

    def test_register_ok(self):
        data = { 'username': 'unit_test', 'email': 'register@email.com', 'password1': 'test1234', 'password2': 'test1234' }
        response = self.client.post(self.register_url, data)
        index_url = reverse('index')
        self.assertRedirects(response, index_url)
        self.assertEquals(get_user_model().objects.count(), 1)

    def test_register_ok(self):
        data = { 'username': 'unit_test', 'password1': 'test1234', 'password2': 'test1234' }
        response = self.client.post(self.register_url, data)
        self.assertFormError(response, 'form', 'email', 'Este campo é obrigatório.')


class UpdateUserTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.url = reverse('accounts:update_user')
        self.user = mommy.prepare(User)

        self.user.set_password('123')
        self.user.save()

    def tearDown(self):
        self.user.delete()

    def test_update_user_ok(self):
        data = {'name': 'test', 'email': 'test@test.com' }

        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 302)

        self.client.login(username=self.user.username, password='123')
        response = self.client.post(self.url, data)
        accounts_index_url = reverse('accounts:index')
        self.assertRedirects(response, accounts_index_url)

        user = User.objects.get(username=self.user.username)
        self.assertEquals(user.email, 'test@test.com')
        self.assertEquals(user.name, 'test')
    
    def test_update_user_error(self):
        data = {}
        self.client.login(username=self.user.username, password='123')
        response = self.client.post(self.url, data)
        self.assertFormError(response, 'form', 'email', 'Este campo é obrigatório.')


class UpdatePasswordTestCase(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.url = reverse('accounts:update_password')
        self.user = mommy.prepare(User)

        self.user.set_password('123')
        self.user.save()

    def tearDown(self):
        self.user.delete()
    
    def test_update_password_ok(self):
        data = { 'old_password': '123', 'new_password1': 'teste123', 'new_password2': 'teste123' }
        self.client.login(username=self.user.username, password='123')
        response = self.client.post(self.url, data)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('teste123'))
