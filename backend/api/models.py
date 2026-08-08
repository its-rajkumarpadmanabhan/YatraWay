from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    home_country = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

class FamilyMember(models.fields.Field):
    pass # Will implement later, dummy for now to make sure the structure is correct
# Actually, let's implement the real model directly.

class FamilyMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='family_members')
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    relationship = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.relationship})"

class Destination(models.Model):
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    nearest_airport = models.CharField(max_length=100, blank=True, null=True)
    nearest_railway = models.CharField(max_length=100, blank=True, null=True)
    nearest_metro = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.city}, {self.country}"

class PlaceOfInterest(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='places')
    name = models.CharField(max_length=200)
    description = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    
    def __str__(self):
        return self.name

class Accommodation(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='accommodations')
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    
    def __str__(self):
        return self.name

class Restaurant(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='restaurants')
    name = models.CharField(max_length=200)
    cuisine = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    
    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    destination = models.ForeignKey(Destination, on_delete=models.PROTECT)
    family_members = models.ManyToManyField(FamilyMember, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='CONFIRMED')

    def __str__(self):
        return f"Booking {self.id} - {self.user.username} to {self.destination.city}"
