from django.contrib import admin
from .models import User, Room, Booking, BookingItem, CancellationPolicy, ContactMessage

# Just register models for basic admin access
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(BookingItem)
admin.site.register(CancellationPolicy)
admin.site.register(ContactMessage)
