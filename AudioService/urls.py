from django.conf.urls import url
from django.urls import include
from django.urls import path
from . import views

urlpatterns = [
    path('AudioService/global/', views.global_search),
    path('AudioService/global/edit/<int:id>', views.global_edit),
    url(
        'AudioService/global/edit/delete-audio/(?P<id>[0-9]+)/', views.global_delete),
    path('AudioService/', views.index),
    path('AudioService/create/', views.audio_list_post),
    path('AudioService/edit/<int:id>/', views.audio_list_put),
    path('AudioService/delete/<int:id>/', views.audio_list_delete),
    path('AudioService/add-audio/<int:id>/', views.audio_add),
    url('AudioService/add-audio/(?P<id1>[0-9]+)/delete-audio/(?P<id>[0-9]+)/',
        views.audio_delete),
    path('sign-up/', views.user_create),
    path('log-out/', views.user_logout),
    path('', views.landing),
    path('registration/', views.registration_rendering),
    path('login/', views.login_rendering),
    path('login/logining_process/', views.user_login),
    path('profile/', views.profile_rendering),
    path('profile/get_username_info/', views.profile),
    path('profile/change_info/', views.change_userInfo),
    path('playlist/', views.playlist_rendering),
]
