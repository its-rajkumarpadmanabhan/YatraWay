from django.db import models
from django.contrib.auth.models import User

class Destination(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.name

class TripPackage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='trips')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=100, help_text="e.g., 5 Days / 4 Nights")
    available_dates = models.CharField(max_length=255, help_text="e.g., Aug 15 - Aug 20, Sep 1 - Sep 6")

    def __str__(self):
        return f"{self.destination.name} - {self.duration}"

class Booking(models.Model):
    PAYMENT_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    trip = models.ForeignKey(TripPackage, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Booking {self.id} by {self.user.username}"

class Traveler(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='travelers')
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    relationship = models.CharField(max_length=100, help_text="e.g., Self, Spouse, Child")

    def __str__(self):
        return self.name
