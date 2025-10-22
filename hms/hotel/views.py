from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Booking, ContactMessage

# ------------------- Static Pages -------------------
def home(request):
    return render(request, 'pages/home.html')

def rooms(request):
    return render(request, 'pages/rooms.html')

def about(request):
    return render(request, 'pages/about.html')

# ------------------- Policy Page -------------------
def privacy_policy(request):
    return render(request, 'pages/privacy-policy.html')

def terms_of_service(request):
    return render(request, 'pages/terms-of-service.html')

def cancellation_policy(request):
    return render(request, 'pages/cancellation-policy.html')


# ------------------- Contact Page -------------------
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name').strip()
        email = request.POST.get('email').strip()
        subject = request.POST.get('subject').strip()
        message = request.POST.get('message').strip()

        if not name or not email or not subject or not message:
            messages.error(request, "All fields are required.")
        else:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request, "Thank you for contacting us. We'll get back to you soon!")
        return redirect('contact') 
        
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

# ------------------- Booking Page -------------------
@login_required
def booking(request):
    if request.method == 'POST':
        room_type = request.POST.get('room_type')
        check_in = request.POST.get('check_in')
        check_out = request.POST.get('check_out')
        guests = request.POST.get('guests')

        if not room_type or not check_in or not check_out or not guests:
            messages.error(request, "All fields are required.")
            return redirect('booking')

        Booking.objects.create(
            user=request.user,
            room_type=room_type,
            check_in=check_in,
            check_out=check_out,
            guests=guests,
            status='ACTIVE'
        )
        messages.success(request, "Booking successful!")
        return redirect('profile')

    return render(request, 'pages/booking.html')
