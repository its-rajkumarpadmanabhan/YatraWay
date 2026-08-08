import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand"><span className="mark">V</span>Voyage</Link>
          <div className="nav-links">
            <Link to="/" className="active">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/trips">Trips</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Family-ready travel planning</span>
              <h1 style={{ marginTop: '14px' }}>Where to next, <em>together?</em></h1>
              <p className="lede">Search any city, country, or landmark and get transit routes, family-friendly stays, and passport requirements bundled into one trip.</p>
              <div className="hero-cta">
                <Link to="/explore" className="btn btn-primary">Start exploring →</Link>
                <a href="#popular" className="btn btn-outline-light">See popular trips</a>
              </div>
              <div className="hero-stats">
                <div><strong>128</strong><span>Countries covered</span></div>
                <div><strong>40k+</strong><span>Family trips planned</span></div>
                <div><strong>4.9★</strong><span>Traveler rating</span></div>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-photo">
                <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4A76A0"/>
                      <stop offset="100%" stopColor="#1B3A5C"/>
                    </linearGradient>
                  </defs>
                  <rect width="500" height="500" fill="url(#sky)"/>
                  <polygon points="0,340 120,220 200,320 280,190 380,330 500,260 500,500 0,500" fill="#12233D" opacity="0.9"/>
                  <polygon points="0,380 150,290 260,370 400,280 500,340 500,500 0,500" fill="#0D1826"/>
                  <circle cx="390" cy="110" r="46" fill="#F1C879" opacity="0.9"/>
                  <g opacity="0.5" stroke="#F7F3EA" strokeWidth="2" fill="none">
                    <path d="M60 150 Q120 90 220 130 T400 150" strokeDasharray="4 8"/>
                  </g>
                </svg>
              </div>
              <div className="float-card f1"><div className="dot">✓</div><div><strong>Passport check</strong><br/>No visa needed for 2 travelers</div></div>
              <div className="float-card f2"><div className="dot">🚄</div><div><strong>Metro 6 min</strong><br/>from your hotel</div></div>
            </div>
          </div>

          <div className="search-tabs">
            <div className="search-tab active">🌍 Explore</div>
            <div className="search-tab">✈ Flights</div>
            <div className="search-tab">🏨 Stays</div>
          </div>
          <div className="search-panel">
            <div className="field">
              <label>Country / State / City</label>
              <input type="text" placeholder="e.g. Kyoto, Japan" />
            </div>
            <div className="field">
              <label>Check-in</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Check-out</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Travelers</label>
              <select><option>2 Adults, 1 Child</option><option>1 Adult</option><option>Add family group</option></select>
            </div>
            <Link to="/explore" className="btn btn-primary" style={{ height: '48px', textDecoration: 'none' }}>Search</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="popular">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Curated for this month</span>
                <h2>Popular destinations</h2>
              </div>
              <Link to="/explore" className="more">View all destinations →</Link>
            </div>
            <div className="destinations-grid">
              <Link className="dest-card" to="/destination/1"><span className="save-badge">-20%</span><h4>Kyoto, Japan</h4><div className="meta"><span>3 airports nearby</span><span className="rating">★ 4.8</span></div></Link>
              <Link className="dest-card" to="/destination/2"><span className="save-badge">Visa-free</span><h4>Lisbon, Portugal</h4><div className="meta"><span>Metro city</span><span className="rating">★ 4.7</span></div></Link>
              <Link className="dest-card" to="/destination/3"><h4>Queenstown, NZ</h4><div className="meta"><span>Family favorite</span><span className="rating">★ 4.9</span></div></Link>
              <Link className="dest-card" to="/destination/4"><span className="save-badge">-15%</span><h4>Marrakech, Morocco</h4><div className="meta"><span>Visa on arrival</span><span className="rating">★ 4.6</span></div></Link>
              <Link className="dest-card" to="/destination/5"><h4>Banff, Canada</h4><div className="meta"><span>Rail accessible</span><span className="rating">★ 4.8</span></div></Link>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container">
            <div className="promo-strip">
              <div>
                <span className="eyebrow" style={{ color: '#CFEFE5' }}>For groups of 4+</span>
                <h3 style={{ marginTop: '10px' }}>Traveling with family? We match passport rules to every person on the trip automatically.</h3>
              </div>
              <Link to="/signup" className="btn" style={{ background: 'var(--white)', color: 'var(--teal)', fontWeight: 800 }}>Add your family →</Link>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container">
            <div className="trust-row">
              <div className="trust-item"><div className="ic">🛂</div><div><h5>Passport-aware</h5><p>We flag which travelers need a visa before you book.</p></div></div>
              <div className="trust-item"><div className="ic">🧭</div><div><h5>Transit built in</h5><p>Nearest airport, rail, and metro shown on every listing.</p></div></div>
              <div className="trust-item"><div className="ic">👨‍👩‍👧</div><div><h5>Family profiles</h5><p>Save every member once, reuse them on every trip.</p></div></div>
              <div className="trust-item"><div className="ic">🔒</div><div><h5>Secure checkout</h5><p>Encrypted payments with instant confirmation.</p></div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '32px' }}>
          <div>
            <Link to="/" className="brand" style={{ color: 'var(--white)' }}><span className="mark">V</span>Voyage</Link>
            <p style={{ marginTop: '14px', fontSize: '13.5px', maxWidth: '260px', color: 'rgba(255,255,255,.55)' }}>Trip planning that accounts for every passport in your family.</p>
          </div>
          <div><h4>Product</h4><ul><li><Link to="/">Home</Link></li><li><Link to="/explore">Explore</Link></li><li><Link to="/destinations">Destinations</Link></li></ul></div>
          <div><h4>Account</h4><ul><li><Link to="/login">Log in</Link></li><li><Link to="/signup">Sign up</Link></li><li><Link to="/dashboard">Dashboard</Link></li></ul></div>
          <div><h4>Support</h4><ul><li><Link to="#">Help center</Link></li><li><Link to="#">Contact us</Link></li><li><Link to="#">Terms</Link></li></ul></div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Voyage. All rights reserved.</span>
          <span>Made for families who plan together.</span>
        </div>
      </footer>
    </>
  );
};

export default Home;
