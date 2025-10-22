from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('rooms', views.rooms, name = "rooms"),
    path('about', views.about, name = "about"),
    path('contact', views.contact, name = "contact"),
    path('signup', views.signup, name = "signup"),
    path('signin', views.signin, name = "signin"),
    path('logout', views.logout, name = "logout"),
    path('profile', views.profile, name = "profile"),
]
