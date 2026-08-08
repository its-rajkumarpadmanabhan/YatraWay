import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/destinations/');
        setDestinations(response.data);
      } catch (err) {
        console.error("Error fetching destinations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

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
          <h1>All Destinations</h1>
          <p className="sub">{destinations.length} results · Explore our top cities</p>
          <div className="search-mini">
            <span>🔍</span>
            <input type="text" placeholder="Search destinations..." />
            <button className="btn btn-primary btn-sm">Search</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="type-tabs">
          <div className="type-tab active">All <span className="count">{destinations.length}</span></div>
          <div className="type-tab">🏙 Cities <span className="count">{destinations.length}</span></div>
        </div>

        <div className="results-shell">
          <aside>
            <div className="filter-group">
              <h5>Price range</h5>
              <div className="price-range"><span>$0</span><input type="range" min="0" max="1000" defaultValue="1000" /><span>$1000</span></div>
            </div>
            <div className="filter-group">
              <h5>Type</h5>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Cities</label><span>{destinations.length}</span></div>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Places of interest</label><span>-</span></div>
              <div className="filter-opt"><label><input type="checkbox" defaultChecked /> Hotels</label><span>-</span></div>
            </div>
            <button className="btn btn-ghost btn-block btn-sm">Reset filters</button>
          </aside>

          <section>
            <div className="results-head-row">
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Showing {destinations.length} results</p>
              <select className="sort-select">
                <option>Sort: Recommended</option>
                <option>Price: Low to high</option>
                <option>Rating: High to low</option>
              </select>
            </div>

            <div className="result-grid" style={{ marginTop: '20px' }}>
              {loading ? <p>Loading destinations...</p> : null}
              {destinations.map((dest) => (
                <Link className="result-card" to={`/destination/${dest.id}`} key={dest.id}>
                  <div className="result-thumb"><span className="kind">City</span></div>
                  <div className="result-body">
                    <h4>{dest.city}</h4>
                    <p className="loc">{dest.state}, {dest.country}</p>
                    <div className="result-foot">
                      <span className="rating">★ 4.8 <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>(2.1k)</span></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SearchResults;
