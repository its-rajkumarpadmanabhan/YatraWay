import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yatraway_backend.settings')
django.setup()

from api.models import Destination, PlaceOfInterest, Accommodation, Restaurant

def populate():
    print("Populating database...")
    
    # 1. Kyoto, Japan
    d1 = Destination.objects.create(
        country='Japan', state='Kyoto Prefecture', city='Kyoto',
        nearest_airport='Kansai International Airport (KIX)',
        nearest_railway='Kyoto Station',
        nearest_metro='Karasuma Line',
        description='Kyoto is famous for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.'
    )
    PlaceOfInterest.objects.create(destination=d1, name='Fushimi Inari Taisha', description='Iconic shrine with thousands of vermilion torii gates.', rating=4.9)
    PlaceOfInterest.objects.create(destination=d1, name='Kinkaku-ji', description='The Golden Pavilion, a Zen temple in northern Kyoto.', rating=4.8)
    Accommodation.objects.create(destination=d1, name='The Ritz-Carlton, Kyoto', address='Kamogawa Nijo-Ohashi Hotori', rating=4.9, price_per_night=850.00)
    Accommodation.objects.create(destination=d1, name='Cross Hotel Kyoto', address='71-1 Daikokucho, Kawaramachi-dori', rating=4.6, price_per_night=150.00)
    Restaurant.objects.create(destination=d1, name='Kikunoi', cuisine='Kaiseki (Traditional multi-course)', rating=4.8)

    # 2. Lisbon, Portugal
    d2 = Destination.objects.create(
        country='Portugal', state='Lisbon District', city='Lisbon',
        nearest_airport='Lisbon Humberto Delgado Airport (LIS)',
        nearest_railway='Santa Apolónia Station',
        nearest_metro='Baixa-Chiado',
        description='Lisbon is Portugal’s hilly, coastal capital city, known for its cafe culture and soulful Fado music.'
    )
    PlaceOfInterest.objects.create(destination=d2, name='Belém Tower', description='A 16th-century fortification located in Lisbon that served as a point of embarkation and disembarkation for Portuguese explorers.', rating=4.7)
    Accommodation.objects.create(destination=d2, name='Four Seasons Hotel Ritz Lisbon', address='Rua Rodrigo da Fonseca 88', rating=4.8, price_per_night=600.00)
    Restaurant.objects.create(destination=d2, name='Belcanto', cuisine='Contemporary Portuguese', rating=4.9)

    # 3. Queenstown, New Zealand
    d3 = Destination.objects.create(
        country='New Zealand', state='Otago', city='Queenstown',
        nearest_airport='Queenstown Airport (ZQN)',
        nearest_railway='N/A (Bus network available)',
        nearest_metro='N/A',
        description='Queenstown sits on the shores of the South Island’s Lake Wakatipu, set against the dramatic Southern Alps.'
    )
    PlaceOfInterest.objects.create(destination=d3, name='Milford Sound', description='A fiord in the southwest of New Zealand’s South Island known for towering Mitre Peak.', rating=4.9)
    Accommodation.objects.create(destination=d3, name='Eichardt\'s Private Hotel', address='Marine Parade', rating=4.8, price_per_night=900.00)
    Restaurant.objects.create(destination=d3, name='Fergburger', cuisine='Gourmet Burgers', rating=4.8)

    print("Database populated successfully!")

if __name__ == '__main__':
    populate()
