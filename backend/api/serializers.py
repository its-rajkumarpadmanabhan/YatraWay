from rest_framework import serializers
from .models import User, FamilyMember, Destination, PlaceOfInterest, Accommodation, Restaurant, Booking
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'home_country', 'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

class FamilyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMember
        fields = '__all__'
        read_only_fields = ['user']

class PlaceOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceOfInterest
        fields = '__all__'

class AccommodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accommodation
        fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class DestinationSerializer(serializers.ModelSerializer):
    places = PlaceOfInterestSerializer(many=True, read_only=True)
    accommodations = AccommodationSerializer(many=True, read_only=True)
    restaurants = RestaurantSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'status']

    def validate(self, data):
        # Validate passport logic
        # Get the destination from the incoming data
        destination = data.get('destination')
        user = self.context['request'].user
        
        # If destination country is different from user's home country, passport is required
        if destination and user.home_country.lower() != destination.country.lower():
            if not data.get('passport_number'):
                raise serializers.ValidationError({"passport_number": "Passport number is required for international travel."})
        return data
