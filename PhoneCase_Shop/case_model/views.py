from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone


# Create your views here.
def home(request):
    return render(request,'case_model/main.html')

def custumize(request):
    return render(request,'case_model/custumize.html')