from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import User, Booking

# ------------------- Static Pages -------------------
def home(request):
    return render(request, 'pages/home.html')

def rooms(request):
    return render(request, 'pages/rooms.html')

def about(request):
    return render(request, 'pages/about.html')

def contact(request):
    return render(request, 'pages/contact.html')


# ------------------- User Authentication -------------------
def signup(request):
    if request.method == 'POST':
        full_name = request.POST.get('fullname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(username=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('signup')

        user = User.objects.create_user(username=email, email=email, password=password)
        user.first_name = full_name
        user.save()

        messages.success(request, "Account created successfully. Please sign in.")
        return redirect('signin')

    return render(request, 'pages/signup.html')


def signin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            auth_login(request, user)
            return redirect('profile')
        else:
            messages.error(request, "Invalid email or password.")
            return redirect('signin')

    return render(request, 'pages/signin.html')


def logout(request):
    auth_logout(request)
    return redirect('home')

# ------------------- Profile -------------------
@login_required
def profile(request):
    bookings = Booking.objects.filter(user=request.user, status__in=['ACTIVE', 'COMPLETED']).order_by('-check_in')
    return render(request, 'pages/profile.html', {'bookings': bookings})
