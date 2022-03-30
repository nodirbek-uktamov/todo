from django.db import models
from core.models import BaseModel
from todo.querysets.todo import TodoQuerySet


class Todo(BaseModel):
    title = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey('users.User', models.CASCADE)
    objects = TodoQuerySet.as_manager()

    class Meta:
        db_table = 'todo_todos'
