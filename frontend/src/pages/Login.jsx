import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-shell">
      <section className="auth-visual-login">
        <Link to="/" className="brand" style={{ color: 'var(--white)' }}>
          <span className="mark">V</span>Voyage
        </Link>
        <div className="passport-card">
          <div className="strip"></div>
          <h5>Traveler profile</h5>
          <p>Amelia R.</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <span className="tag-pill">Home: Canada</span>
            <span className="tag-pill coral">3 family members</span>
          </div>
        </div>
        <div className="stampwrap">
          <div className="stamp" style={{ borderColor: 'rgba(255,255,255,.5)', color: 'rgba(255,255,255,.85)' }}>
            Welcome<br/>back
          </div>
        </div>
        <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.6)', maxWidth: '320px' }}>
          Every login keeps your family's passport data ready for your next booking.
        </p>
      </section>

      <section className="auth-form-side">
        <div className="auth-box login-box">
          <Link to="/" className="brand" style={{ display: 'none' }}></Link>
          <span className="eyebrow">Welcome back</span>
          <h1 style={{ marginTop: '12px' }}>Log in to Voyage</h1>
          <p className="sub">Pick up your trip planning where you left off.</p>

          <form className="auth-form login-form">
            <div className="field">
              <label htmlFor="email">Email or username</label>
              <input id="email" type="text" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="row-between">
              <label className="checkbox-row"><input type="checkbox" /> Remember me</label>
              <a href="#" style={{ fontWeight: 700, color: 'var(--ink)' }}>Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '6px' }}>Log in</button>
          </form>

          <div className="divider">or continue with</div>
          <div className="social-row">
            <button className="social-btn">Google</button>
            <button className="social-btn">Apple</button>
          </div>

          <p className="switch-line">New to Voyage? <Link to="/signup">Create an account</Link></p>
        </div>
      </section>
    </div>
  );
};

export default Login;
