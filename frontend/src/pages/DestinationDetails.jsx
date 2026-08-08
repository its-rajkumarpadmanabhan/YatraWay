import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  // If no ID is provided, default to 1 (for the demo links)
  const destId = id || 1;

  useEffect(() => {
    const fetchDest = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/destinations/${destId}/`);
        setDestination(response.data);
      } catch (err) {
        console.error("Error fetching destination", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDest();
  }, [destId]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading destination details...</div>;
  if (!destination) return <div style={{ padding: '40px', textAlign: 'center' }}>Destination not found.</div>;

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand"><span className="mark">V</span>Voyage</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/destinations" className="active">Destinations</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </nav>

      <header className="dest-hero">
        <div className="breadcrumb">
          <div className="container">
            <Link to="/">Home</Link> / <Link to="/explore">Explore</Link> / {destination.city}
          </div>
        </div>
        <div className="container">
          <div>
            <span className="eyebrow" style={{ color: '#F0906B' }}>{destination.country} · {destination.state}</span>
            <h1>{destination.city}</h1>
            <div className="loc-line">
              <span className="rating" style={{ color: 'var(--white)' }}>★ 4.8 (2,140 reviews)</span>
              <span>·</span>
              <span>{destination.description || 'A beautiful place to visit.'}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn btn-primary">Book travel →</Link>
        </div>
      </header>

      <main className="container">
        <div className="dest-shell">
          <div>
            <section style={{ marginBottom: '44px' }}>
              <div className="subhead"><span className="n">1</span><h2>Getting there</h2></div>
              <div className="transit-grid">
                <div className="transit-card">
                  <div className="ic">✈️</div>
                  <h5>Nearest airport</h5>
                  <p>{destination.nearest_airport || 'N/A'}</p>
                </div>
                <div className="transit-card">
                  <div className="ic">🚄</div>
                  <h5>Railway station</h5>
                  <p>{destination.nearest_railway || 'N/A'}</p>
                </div>
                <div className="transit-card">
                  <div className="ic">🚇</div>
                  <h5>Nearest metro</h5>
                  <p>{destination.nearest_metro || 'N/A'}</p>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '44px' }}>
              <div className="subhead"><span className="n">2</span><h2>Recommended stays</h2></div>
              <div className="reco-scroll">
                {destination.accommodations && destination.accommodations.map(acc => (
                  <div className="reco-card" key={acc.id}>
                    <div className="reco-thumb"></div>
                    <div className="reco-body">
                      <h5>{acc.name}</h5>
                      <div className="meta"><span>${acc.price_per_night}/night</span><span className="rating">★ {acc.rating}</span></div>
                    </div>
                  </div>
                ))}
                {(!destination.accommodations || destination.accommodations.length === 0) && <p>No accommodations listed.</p>}
              </div>
            </section>

            <section style={{ marginBottom: '44px' }}>
              <div className="subhead"><span className="n">3</span><h2>Recommended restaurants</h2></div>
              <div className="reco-scroll">
                {destination.restaurants && destination.restaurants.map(rest => (
                  <div className="reco-card" key={rest.id}>
                    <div className="reco-thumb"></div>
                    <div className="reco-body">
                      <h5>{rest.name}</h5>
                      <div className="meta"><span>{rest.cuisine}</span><span className="rating">★ {rest.rating}</span></div>
                    </div>
                  </div>
                ))}
                {(!destination.restaurants || destination.restaurants.length === 0) && <p>No restaurants listed.</p>}
              </div>
            </section>

            <section>
              <div className="subhead"><span className="n">4</span><h2>Places to visit</h2></div>
              <div className="places-grid">
                {destination.places && destination.places.map(place => (
                  <div className="place-card" key={place.id}>
                    <div className="place-thumb"></div>
                    <div><h5>{place.name}</h5><p>{place.description}</p></div>
                  </div>
                ))}
                {(!destination.places || destination.places.length === 0) && <p>No places listed.</p>}
              </div>
            </section>
          </div>

          <aside>
            <div className="side-sticky">
              <div className="book-card">
                <div className="price-line"><strong>$1,240</strong><span>avg. per person / trip</span></div>
                <Link to="/checkout" className="btn btn-primary btn-block">Book travel →</Link>
                <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '10px', textAlign: 'center' }}>
                  Free cancellation up to 48 hours before departure
                </p>
              </div>

              <div className="visa-card">
                <h5>🛂 Passport check</h5>
                <p>Travelers to {destination.country} might need a visa depending on their home country. Check passport requirements at checkout.</p>
              </div>

              <div className="weather-mini">
                <div><strong>18°C</strong>Today</div>
                <div><strong>21°C</strong>Tomorrow</div>
                <div><strong>19°C</strong>Wed</div>
                <div><strong>17°C</strong>Thu</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default DestinationDetails;
