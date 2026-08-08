import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  return (
    <div className="auth-shell">
      <section className="auth-visual-signup">
        <Link to="/" className="brand" style={{ color: 'var(--white)' }}>
          <span className="mark">V</span>Voyage
        </Link>

        <div className="card-stack">
          <div className="stack-card s1">
            <h5>Home country</h5>
            <p>🇮🇳 India</p>
          </div>
          <div className="stack-card s2">
            <h5>Visa check</h5>
            <p>Auto-flagged for 4 upcoming trips</p>
          </div>
        </div>

        <div className="why-list">
          <div><span className="check">✓</span> We match your passport to every destination's entry rules</div>
          <div><span className="check">✓</span> Add family members once, reuse them on every booking</div>
          <div><span className="check">✓</span> Get warned before you book somewhere you'd need a visa</div>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-box">
          <span className="eyebrow">Get started</span>
          <h1 style={{ marginTop: '12px' }}>Create your account</h1>
          <p className="sub">Takes about a minute — we'll use your home country to check visa requirements automatically.</p>

          <form className="auth-form">
            <div className="field-row two">
              <div className="field">
                <label htmlFor="fname">First name</label>
                <input id="fname" type="text" placeholder="Amelia" required />
              </div>
              <div className="field">
                <label htmlFor="lname">Last name</label>
                <input id="lname" type="text" placeholder="Rossi" required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="semail">Email</label>
              <input id="semail" type="email" placeholder="you@example.com" required />
            </div>

            <div className="field-row two">
              <div className="field">
                <label htmlFor="spass">Password</label>
                <input id="spass" type="password" placeholder="8+ characters" required />
              </div>
              <div className="field">
                <label htmlFor="spass2">Confirm password</label>
                <input id="spass2" type="password" placeholder="Repeat password" required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="homecountry">Home country <span style={{ color: 'var(--coral)' }}>*</span></label>
              <select id="homecountry" required defaultValue="">
                <option value="" disabled>Select your home country</option>
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>Japan</option>
                <option>Brazil</option>
                <option>South Africa</option>
                <option>Other</option>
              </select>
              <span className="hint">This is the country your passport is issued from.</span>
            </div>

            <div className="home-country-note">
              🛂&nbsp; We use this to check visa and passport requirements for every destination you search — you can add family members with their own home countries later.
            </div>

            <label className="checkbox-row">
              <input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy
            </label>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '4px' }}>Create account</button>
          </form>

          <p className="switch-line">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
