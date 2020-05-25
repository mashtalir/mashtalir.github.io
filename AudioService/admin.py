from django.contrib import admin
from .models import AudioList
from .models import Audio, User

admin.site.register(AudioList)

# admin.site.register(User)

admin.site.register(Audio)
