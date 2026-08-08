# Travel AI Website (YatraWay) Implementation Plan

We will build a comprehensive travel planning website using Python/Django for the backend and React for the frontend.

## User Review Required
> [!IMPORTANT]
> Since we are starting from scratch, I will be setting up a new Django backend and a React (Vite) frontend in the project directory (`C:\Users\user\Desktop\YatraWay`). Please review the data models and technical stack below and let me know if it aligns with your expectations.

## Open Questions
> [!NOTE]
> 1. Do you have a preferred UI framework for React (e.g., Material-UI, Tailwind CSS) or should I use custom CSS following modern, premium web design aesthetics?
> 2. For the AI recommendations (hotels, restaurants, places), do you want to integrate a real third-party API (like Google Places, OpenAI) or should we start with a mocked database of places for the prototype?
> 3. Should we use SQLite (Django's default) for the database or do you prefer PostgreSQL?

## Proposed Architecture

### 1. Backend (Django + Django REST Framework)
- **Framework**: Django & Django REST Framework (DRF)
- **Auth**: JWT (JSON Web Tokens) or Session auth for login/signup.

**Database Models:**
- `User`: Extended Django User model (includes `home_country` for the passport logic).
- `FamilyMember`: Linked to User (Name, Age, Relationship, etc.).
- `Destination`: Country, State, City, Nearest Airport, Nearest Railway, Nearest Metro.
- `PlaceOfInterest`: Tourist spots linked to Destination.
- `Accommodation`: Hotels linked to Destination.
- `Restaurant`: Dining options linked to Destination.
- `Booking`: User, Destination, Family Members included, Travel Dates, and conditional `PassportDetails` (Required if Destination Country != User's Home Country).

**Key API Endpoints:**
- `/api/auth/register/` and `/api/auth/login/`
- `/api/profile/family/` (CRUD operations for family members)
- `/api/destinations/` (Filter by country, state, city)
- `/api/destinations/<id>/transit/` (Nearest airports, railways, metros)
- `/api/destinations/<id>/hotels/` & `/api/destinations/<id>/restaurants/`
- `/api/bookings/` (Submit travel booking and validate passport requirement)

### 2. Frontend (React)
- **Framework**: React (initialized via Vite)
- **Routing**: React Router
- **State Management**: React Context or Redux Toolkit

**Core Pages/Components:**
- `Home`: Search bar for Country/State/City.
- `Auth`: Login and Signup pages.
- `Dashboard/Profile`: Manage personal details and family members.
- `SearchResults`: Display cities, places, hotels, and restaurants.
- `DestinationDetail`: Show transit info (airport/railway/metro) and AI recommendations.
- `BookingFlow`: Multi-step form for personal details, selecting family members, and dynamic passport validation based on the chosen destination.

## Verification Plan

### Automated Setup
- Initialize Django project and React app.
- Create models, run migrations, and test API endpoints.
- Build React components and test state/routing.

### Manual Verification
- Register a new user and add family members.
- Search for a domestic destination and book without providing a passport.
- Search for an international destination and verify that passport details are required.
- Review the UI to ensure premium, dynamic aesthetics.
