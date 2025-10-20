from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# -------------------
# User & Profile
# -------------------
class User(AbstractUser):
    # default Django fields: username, email, password, etc.
    # Add more fields here if needed
    pass

# -------------------
# Rooms
# -------------------
class Room(models.Model):
    ROOM_TYPES = ['Single','Double','Suite','Deluxe','Presidential']
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=10, choices=ROOM_TYPES)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    max_occupancy = models.PositiveIntegerField(default=2)

    def __str__(self):
        return f"{self.room_number} ({self.room_type})"

# -------------------
# Booking & Items
# -------------------
class Booking(models.Model):
    STATUS_CHOICES = ['Active','Canceled']
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    canceled_at = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Booking #{self.id} by {self.user.username}"

    def is_past_booking(self):
        return self.check_out < timezone.localdate()


class BookingItem(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='items')
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.room.room_number} in Booking #{self.booking.id}"


# -------------------
# Global Cancellation Policy
# -------------------
class CancellationPolicy(models.Model):
    description = models.TextField(default="Free cancellation allowed until 24 hours before check-in.")

    def __str__(self):
        return "Global Cancellation Policy"
