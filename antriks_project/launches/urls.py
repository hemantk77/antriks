from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('agency/<str:agency_name>/', views.agency_launches, name='agency_launches'),
]