from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Booking

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
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('signup')

        User.objects.create_user(username=username, email=email, password=password, first_name=full_name)
        messages.success(request, "Account created successfully. Please sign in.")
        return redirect('signin')

    return render(request, 'pages/signup.html')


def signin(request):
    if request.method == 'POST':
        identifier = request.POST.get('identifier')  # username or email
        password = request.POST.get('password')

        # Check if identifier is email
        try:
            user_obj = User.objects.get(email=identifier)
            username = user_obj.username
        except User.DoesNotExist:
            username = identifier

        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('profile')
        else:
            messages.error(request, "Invalid username/email or password.")
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
