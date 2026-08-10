# YatraWay Implementation Plan

YatraWay is a travel booking platform inspired by "MakeMyTrip" where anyone can view destinations, but only authenticated users can view prices, add traveler/family member details, and complete bookings with payment integration.

## User Review Required

> [!IMPORTANT]
> This is a large full-stack project. I will set up the backend (Django + Django REST Framework) and the frontend (React + Vite) in this directory. We will use SQLite for the database initially for ease of setup.

## Open Questions

> [!WARNING]
> 1. **Payment Gateway**: For the "payment details" requirement, should we integrate a real test mode (like Stripe) or create a mock payment page for demonstration purposes?
> 2. **Styling**: Do you prefer plain CSS (as per general guidelines) or would you like to use TailwindCSS for rapid UI development?
> 3. **Database**: I'll use SQLite by default to keep the setup simple. Let me know if you want PostgreSQL.

## Proposed Changes

We will create two main directories: `backend` (Django) and `frontend` (React).

### Backend (Django)
We will create a Django project with an `api` app.

*   **Authentication**: We'll use `djangorestframework-simplejwt` for secure JSON Web Token (JWT) based login/signup.
*   **Models**:
    *   `Destination`: name, location, description, image_url.
    *   `TripPackage`: destination (ForeignKey), price, duration, available_dates.
    *   `Booking`: user (ForeignKey), trip (ForeignKey), booking_date, payment_status, total_price.
    *   `Traveler`: booking (ForeignKey), name, age, relationship (for family members).
*   **API Endpoints**:
    *   `/api/destinations/` - Publicly accessible list of places.
    *   `/api/destinations/<id>/` - Public details (excluding price).
    *   `/api/trips/<id>/` - Protected endpoint (requires token) to view pricing.
    *   `/api/book/` - Protected endpoint to submit booking and traveler details.
    *   `/api/auth/register/` and `/api/auth/login/`

### Frontend (React)
We will initialize a React app using Vite (`frontend`).

*   **Tech Stack**: React, React Router for navigation, Axios for API calls, and CSS for styling.
*   **Pages**:
    *   `Home Page`: Beautiful display of all destinations (Public).
    *   `Destination Details Page`: Shows information. If logged out, prompts to "Login to view price & book".
    *   `Authentication`: Login and Signup pages.
    *   `Booking Page`: Dynamic form to add primary user details and add multiple family members. Shows total price and a payment form.
    *   `My Bookings`: Dashboard for users to see their upcoming and past trips.

## Verification Plan

### Automated/Manual Testing
1.  Run Django development server and React development server.
2.  Verify a guest user can browse destinations but cannot see prices or book.
3.  Create an account, log in, and verify the user can now see prices.
4.  Go through the booking flow, add family members, submit mock payment details, and confirm the booking appears in the user dashboard.
