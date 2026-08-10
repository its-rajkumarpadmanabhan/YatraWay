from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Destination, TripPackage, Booking, Traveler

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'

class TripPackageSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(read_only=True)
    class Meta:
        model = TripPackage
        fields = '__all__'

class TravelerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traveler
        fields = ('name', 'age', 'relationship')

class BookingSerializer(serializers.ModelSerializer):
    travelers = TravelerSerializer(many=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'trip', 'payment_status', 'total_price', 'travelers', 'booking_date')
        read_only_fields = ('id', 'payment_status', 'booking_date')

    def create(self, validated_data):
        travelers_data = validated_data.pop('travelers')
        booking = Booking.objects.create(**validated_data)
        for traveler_data in travelers_data:
            Traveler.objects.create(booking=booking, **traveler_data)
        return booking
