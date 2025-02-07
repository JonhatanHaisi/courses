# coding:utf-8
""" Unit tests for core views """

from django.test import TestCase, Client
from django.core.urlresolvers import reverse
from django.core import mail
from django.contrib.auth import get_user_model
from django.conf import settings

from model_mommy import mommy

class IndexViewTestCase(TestCase):
    """ Class to test Index view """

    def setUp(self):
        """ Method to setup the test case """
        self.client = Client()
        self.url = reverse('index')
    
    def tearDown(self):
        """ Called after tests """
        pass

    def test_status_code(self):
        """ Test to check response code successful """
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)

    def test_template_used(self):
        """ Test to check template used """
        response = self.client.get(self.url)
        self.assertTemplateUsed(response, 'index.html')

class ContactViewTestCase(TestCase):
    """ Class to test contact view """

    def setUp(self):
        """ Method to setup the test case """
        self.client = Client()
        self.url = reverse('contact')
    
    def tearDown(self):
        """ Called after tests """
        pass

    def test_status_code(self):
        """ Test to check response code successful """
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)

    def test_template_used(self):
        """ Test to check template used """
        response = self.client.get(self.url)
        self.assertTemplateUsed(response, 'contact.html')

    def test_form_error(self):
        data = { 'name': '', 'email': '', 'message': '' }
        response = self.client.post(self.url, data)
        self.assertFormError(response, 'form', 'name', 'Este campo é obrigatório.')
        self.assertFormError(response, 'form', 'email', 'Este campo é obrigatório.')
        self.assertFormError(response, 'form', 'message', 'Este campo é obrigatório.')

    def test_form_ok(self):
        data = { 'name': 'name', 'email': 'eail@test.com', 'message': 'message' }
        response = self.client.post(self.url, data)
        self.assertTrue(response.context['success'])
        self.assertEquals(len(mail.outbox), 1)
        self.assertEquals(mail.outbox[0].subject, 'Contato do Haisi E-commerce')

class LoginViewTestCase(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('login')
        self.user  = mommy.prepare(get_user_model())
        self.user.set_password('123456')
        self.user.save()

    def tearDown(self):
        self.user.delete()

    def test_login_ok(self):
        response = self.client.get(self.login_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')

        data = { 'username': self.user.username, 'password': '123456' }
        response = self.client.post(self.login_url, data)
        redirect_url = reverse(settings.LOGIN_REDIRECT_URL)
        self.assertRedirects(response, redirect_url, status_code=302)
        self.assertTrue(response.wsgi_request.user.is_authenticated())

    def test_login_error(self):
        data = { 'username': self.user.username, 'password': 'INVALID' }
        response = self.client.post(self.login_url, data)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')
        error_msg = 'Por favor, entre com um Apelido / Usuário  e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.'
        self.assertFormError(response, 'form', None, error_msg)



