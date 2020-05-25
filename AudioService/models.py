from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


# class User(models.Model):
#     username = models.CharField(max_length=25, unique=True)
#     email = models.EmailField()
#     password = models.CharField(max_length=25)


class AudioList(models.Model):
    list_choices = [
        ("pr", "private"),
        ("pub", "public"),
    ]
    name = models.CharField(default="A", max_length=30, unique=True)
    type = models.CharField(
        max_length=8, choices=list_choices, default="private")
    connect = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE)


class Audio(models.Model):
    file = models.FileField(default="aaa", null=True)
    name = models.CharField(default="A", max_length=30, unique=True)
    connect_audio = models.ManyToManyField(AudioList, null=True, blank=True)
