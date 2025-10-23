from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.http import JsonResponse
from .models import Booking, ContactMessage,Room, BookingItem



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
        next_url = request.POST.get('next') 

        # Check if identifier is email
        try:
            user_obj = User.objects.get(email=identifier)
            username = user_obj.username
        except User.DoesNotExist:
            username = identifier

        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            # Redirect to next if available
            if next_url:
                return redirect(next_url)
            return redirect('profile')
        else:
            messages.error(request, "Invalid username/email or password.")
            return redirect('signin')

    # If user comes with ?next=..., pass it to template
    next_url = request.GET.get('next', '')
    return render(request, 'pages/signin.html', {'next': next_url})



def logout(request):
    auth_logout(request)
    return redirect('home')


# ------------------- Profile -------------------
@login_required
def profile(request):
    bookings = Booking.objects.filter(user=request.user).order_by('id')
    return render(request, 'pages/profile.html', {'bookings': bookings})

# ------------------- Booking Page -------------------
@login_required
def booking(request):
    # If AJAX request: fetch rooms by type (for dynamic dropdown)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        room_type = request.GET.get('room_type')
        rooms = Room.objects.filter(room_type=room_type, is_available=True)
        room_data = [
            {
                'room_number': room.room_number,
                'price_per_night': float(room.price_per_night),
                'max_occupancy': room.max_occupancy,
                'is_available': not room.is_available
            }
            for room in rooms
        ]
        return JsonResponse({'rooms': room_data})

    # POST = booking form submission
    if request.method == 'POST':
        check_in = request.POST.get('check_in')
        check_out = request.POST.get('check_out')
        room_type = request.POST.get('room_type')
        room_numbers = request.POST.getlist('room_number')
        special_request = request.POST.get('special_request', '')

        if not (check_in and check_out and room_type and room_numbers):
            messages.error(request, "Please fill in all fields.")
            return redirect('booking')

        # Convert date strings to date objects
        check_in_date = datetime.strptime(check_in, "%Y-%m-%d").date()
        check_out_date = datetime.strptime(check_out, "%Y-%m-%d").date()
        total_days = (check_out_date - check_in_date).days or 1

        # Get all room objects
        selected_rooms = Room.objects.filter(room_number__in=room_numbers)
        if not selected_rooms.exists():
            messages.error(request, "Selected rooms are not available.")
            return redirect('booking')

        # Calculate total
        total_amount = sum(r.price_per_night for r in selected_rooms) * total_days

        # Create Booking
        booking = Booking.objects.create(
            user=request.user,
            check_in=check_in_date,
            check_out=check_out_date,
            total_amount=total_amount,
            special_request=special_request,
        )
        unavailable = BookingItem.objects.filter(
        room__room_number__in=room_numbers,
        booking__check_in__lt=check_out_date,
        booking__check_out__gt=check_in_date,
        booking__status='ACTIVE'
)


        if unavailable.exists():
            return JsonResponse({"error": "Some rooms are already booked for these dates."}, status=400)
        else:
        # Create BookingItems
            for room in selected_rooms:
                BookingItem.objects.create(
                    booking=booking,
                    room=room,
                    price_per_night=room.price_per_night,
                )
                room.is_available = False
                room.save()

            messages.success(request, "Your booking has been confirmed!")
            return redirect('profile')

    # GET: show booking form
    room_types = Room.ROOM_TYPES
    return render(request, 'pages/booking.html', {'room_types': room_types})
