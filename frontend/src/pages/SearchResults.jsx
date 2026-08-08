import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand"><span className="mark">V</span>Voyage</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/explore" className="active">Explore</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </nav>

      <header className="results-bar">
        <div className="container">
          <span className="eyebrow" style={{ color: '#F0906B' }}>Search results</span>
          <h1>Kyoto, Japan</h1>
          <p className="sub">128 results · Cities, places, hotels & restaurants matching "Kyoto"</p>
          <div className="search-mini">
            <span>🔍</span>
            <input type="text" defaultValue="Kyoto, Japan" />
            <button className="btn btn-primary btn-sm">Search</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="type-tabs">
          <div className="type-tab active">All <span className="count">128</span></div>
          <div className="type-tab">🏙 Cities <span className="count">4</span></div>
          <div className="type-tab">📍 Places of interest <span className="count">36</span></div>
          <div className="type-tab">🏨 Hotels <span className="count">52</span></div>
          <div className="type-tab">🍽 Restaurants <span className="count">36</span></div>
        </div>

        <div className="results-shell">
          <aside>
            <div className="filter-group">
              <h5>Price range</h5>
              <div className="price-range"><span>$0</span><input type="range" min="0" max="1000" defaultValue="1000" /><span>$1000</span></div>
            </div>
            <div className="filter-group">
              <h5>Type</h5>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Cities</label><span>4</span></div>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Places of interest</label><span>36</span></div>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Hotels</label><span>52</span></div>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Restaurants</label><span>36</span></div>
            </div>
            <div className="filter-group">
              <h5>Rating</h5>
              <div className="star-filter"><span>3.5+</span><span>4.0+</span><span>4.5+</span></div>
            </div>
            <div className="filter-group">
              <h5>Amenities</h5>
              <div className="filter-opt"><label><input type="checkbox" /> Near metro</label></div>
              <div className="filter-opt"><label><input type="checkbox" /> Family friendly</label></div>
              <div className="filter-opt"><label><input type="checkbox" /> Free cancellation</label></div>
              <div className="filter-opt"><label><input type="checkbox" /> Visa-free entry</label></div>
            </div>
            <button className="btn btn-ghost btn-block btn-sm">Reset filters</button>
          </aside>

          <section>
            <div className="results-head-row">
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Showing 1–9 of 128</p>
              <select className="sort-select">
                <option>Sort: Recommended</option>
                <option>Price: Low to high</option>
                <option>Rating: High to low</option>
              </select>
            </div>

            <div className="result-grid" style={{ marginTop: '20px' }}>
              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">City</span></div>
                <div className="result-body">
                  <h4>Kyoto</h4>
                  <p className="loc">Kansai region, Japan</p>
                  <div className="result-foot">
                    <span className="rating">★ 4.8 <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>(2.1k)</span></span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Place</span></div>
                <div className="result-body">
                  <h4>Fushimi Inari Shrine</h4>
                  <p className="loc">Fushimi Ward · Places of interest</p>
                  <div className="result-foot">
                    <span className="rating">★ 4.9 <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>(9.4k)</span></span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Hotel</span></div>
                <div className="result-body">
                  <h4>The Ritz-Carlton Kyoto</h4>
                  <p className="loc">Nakagyo Ward · Hotel</p>
                  <div className="result-foot">
                    <span className="price">$420<span>/night</span></span>
                    <span className="rating">★ 4.9</span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Restaurant</span></div>
                <div className="result-body">
                  <h4>Kikunoi Honten</h4>
                  <p className="loc">Higashiyama · Kaiseki dining</p>
                  <div className="result-foot">
                    <span className="price">$$$$</span>
                    <span className="rating">★ 4.8</span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Place</span></div>
                <div className="result-body">
                  <h4>Arashiyama Bamboo Grove</h4>
                  <p className="loc">Arashiyama · Places of interest</p>
                  <div className="result-foot">
                    <span className="rating">★ 4.7 <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>(6.2k)</span></span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Hotel</span></div>
                <div className="result-body">
                  <h4>Hyatt Regency Kyoto</h4>
                  <p className="loc">Higashiyama Ward · Hotel</p>
                  <div className="result-foot">
                    <span className="price">$210<span>/night</span></span>
                    <span className="rating">★ 4.6</span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Restaurant</span></div>
                <div className="result-body">
                  <h4>Nishiki Market Eateries</h4>
                  <p className="loc">Nakagyo · Street food</p>
                  <div className="result-foot">
                    <span className="price">$</span>
                    <span className="rating">★ 4.5</span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Place</span></div>
                <div className="result-body">
                  <h4>Kinkaku-ji (Golden Pavilion)</h4>
                  <p className="loc">Kita Ward · Places of interest</p>
                  <div className="result-foot">
                    <span className="rating">★ 4.8 <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>(8.1k)</span></span>
                  </div>
                </div>
              </Link>

              <Link className="result-card" to="/destination/1">
                <div className="result-thumb"><span className="kind">Hotel</span></div>
                <div className="result-body">
                  <h4>Kyoto Family Ryokan</h4>
                  <p className="loc">Higashiyama · Family friendly</p>
                  <div className="result-foot">
                    <span className="price">$140<span>/night</span></span>
                    <span className="rating">★ 4.7</span>
                  </div>
                </div>
              </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <button className="btn btn-ghost">Load more results</button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SearchResults;
