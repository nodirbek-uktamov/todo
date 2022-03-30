from django.urls import reverse

from core.tests.base_test import BaseTestCase
from users.tests.constants import USER_TOKEN


class TodoTest(BaseTestCase):
    fixtures = ('users_and_tokens.yaml', 'todos.yaml',)

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + USER_TOKEN)

    def test_list(self):
        response = self.client.get(reverse('todo:todo-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['results'][0]['id'], 1)
        self.assertEqual(response.data['results'][1]['id'], 2)

    def test_create(self):
        data = {'title': 'Сделать', 'description': 'Сделать todo list'}
        response = self.client.post(reverse('todo:todo-list'), data)
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('todo:todo-list'), {})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["title"], ["This field is required."])
        self.assertEqual(response.data["description"], ["This field is required."])

    def test_delete(self):
        response = self.client.delete(reverse('todo:todo-detail', kwargs={"pk": 1}))
        self.assertEqual(response.status_code, 204)

    def test_update(self):
        url = reverse('todo:todo-detail', kwargs={"pk": 1})
        data = {'title': 'Сделать', 'description': 'Сделать todo list'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 200)

        response = self.client.put(url, {})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["title"], ["This field is required."])
        self.assertEqual(response.data["description"], ["This field is required."])
