from django.shortcuts import render
# Create your views here.
def home(request):
    return render(request,'pages/home.html')

def rooms(request):
    return render(request,'pages/rooms.html')

def about(request):
    return render(request,'pages/about.html')

def contact(request):
    return render(request,'pages/contact.html')