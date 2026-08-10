from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, DestinationListView, DestinationDetailView, TripPackageListView, BookingCreateView

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Destinations
    path('destinations/', DestinationListView.as_view(), name='destination-list'),
    path('destinations/<int:pk>/', DestinationDetailView.as_view(), name='destination-detail'),
    
    # Trips (Protected)
    path('destinations/<int:destination_id>/trips/', TripPackageListView.as_view(), name='trip-list'),
    
    # Bookings (Protected)
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
]
