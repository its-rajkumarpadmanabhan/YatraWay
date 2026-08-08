import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationDetails.css';

const DestinationDetails = () => {
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
            <Link to="/">Home</Link> / <Link to="/explore">Explore</Link> / Kyoto
          </div>
        </div>
        <div className="container">
          <div>
            <span className="eyebrow" style={{ color: '#F0906B' }}>Japan · Kansai region</span>
            <h1>Kyoto</h1>
            <div className="loc-line">
              <span className="rating" style={{ color: 'var(--white)' }}>★ 4.8 (2,140 reviews)</span>
              <span>·</span>
              <span>Best time to visit: Mar–May</span>
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
                  <p>Kansai International (KIX)</p>
                  <span className="dist">52 km · ~75 min</span>
                </div>
                <div className="transit-card">
                  <div className="ic">🚄</div>
                  <h5>Railway station</h5>
                  <p>Kyoto Station (Shinkansen)</p>
                  <span className="dist">City center · ~10 min</span>
                </div>
                <div className="transit-card">
                  <div className="ic">🚇</div>
                  <h5>Nearest metro</h5>
                  <p>Karasuma Line — Shijo Sta.</p>
                  <span className="dist">0.4 km · ~5 min walk</span>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '44px' }}>
              <div className="subhead"><span className="n">2</span><h2>Recommended stays</h2></div>
              <div className="ai-banner">
                <span className="badge">AI matched</span> Ranked using your family size, budget, and stated preference for walkable neighborhoods.
              </div>
              <div className="reco-scroll">
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>The Ritz-Carlton Kyoto</h5>
                    <div className="meta"><span>$420/night</span><span className="rating">★ 4.9</span></div>
                  </div>
                </div>
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Kyoto Family Ryokan</h5>
                    <div className="meta"><span>$140/night</span><span className="rating">★ 4.7</span></div>
                  </div>
                </div>
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Hyatt Regency Kyoto</h5>
                    <div className="meta"><span>$210/night</span><span className="rating">★ 4.6</span></div>
                  </div>
                </div>
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Gion Boutique Inn</h5>
                    <div className="meta"><span>$185/night</span><span className="rating">★ 4.8</span></div>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '44px' }}>
              <div className="subhead"><span className="n">3</span><h2>Recommended restaurants</h2></div>
              <div className="reco-scroll">
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Kikunoi Honten</h5>
                    <div className="meta"><span>Kaiseki · $$$$</span><span className="rating">★ 4.8</span></div>
                  </div>
                </div>
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Nishiki Market Eateries</h5>
                    <div className="meta"><span>Street food · $</span><span className="rating">★ 4.5</span></div>
                  </div>
                </div>
                <div className="reco-card">
                  <div className="reco-thumb"></div>
                  <div className="reco-body">
                    <h5>Omen Kodaiji</h5>
                    <div className="meta"><span>Udon · $$</span><span className="rating">★ 4.7</span></div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="subhead"><span className="n">4</span><h2>Places to visit</h2></div>
              <div className="places-grid">
                <div className="place-card">
                  <div className="place-thumb"></div>
                  <div><h5>Fushimi Inari Shrine</h5><p>Iconic torii gate paths through the mountainside.</p></div>
                </div>
                <div className="place-card">
                  <div className="place-thumb"></div>
                  <div><h5>Arashiyama Bamboo Grove</h5><p>A quiet, towering bamboo forest walk.</p></div>
                </div>
                <div className="place-card">
                  <div className="place-thumb"></div>
                  <div><h5>Kinkaku-ji</h5><p>The gold-leaf covered Golden Pavilion.</p></div>
                </div>
                <div className="place-card">
                  <div className="place-thumb"></div>
                  <div><h5>Gion District</h5><p>Historic geisha quarter, best at dusk.</p></div>
                </div>
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
                <p>Travelers from the US, UK, and most EU countries can enter Japan visa-free for up to 90 days.</p>
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
