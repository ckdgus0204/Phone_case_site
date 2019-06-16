from django.contrib import admin
from django.urls import path
from case_model import views

urlpatterns=[
    path('home/',views.home,name="home"),
    path('custumize/',views.custumize,name="custumize"),
    path('ranking/',views.ranking, name="ranking"),
    path('cart/',views.cart, name="cart"),
    path('phonecase/',views.phonecase, name="phonecase"),
]
