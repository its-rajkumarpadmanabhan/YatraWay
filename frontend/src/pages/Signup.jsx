import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const { registerUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    homeCountry: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      home_country: formData.homeCountry
    };

    const success = await registerUser(payload);
    if (!success) {
      setError('Registration failed. Email might already be in use.');
    }
  };

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

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'var(--coral)', fontSize: '13px', fontWeight: 'bold' }}>{error}</div>}
            
            <div className="field-row two">
              <div className="field">
                <label htmlFor="fname">First name</label>
                <input id="fname" name="firstName" type="text" placeholder="Amelia" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="lname">Last name</label>
                <input id="lname" name="lastName" type="text" placeholder="Rossi" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="semail">Email</label>
              <input id="semail" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="field-row two">
              <div className="field">
                <label htmlFor="spass">Password</label>
                <input id="spass" name="password" type="password" placeholder="8+ characters" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="spass2">Confirm password</label>
                <input id="spass2" name="confirmPassword" type="password" placeholder="Repeat password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="homecountry">Home country <span style={{ color: 'var(--coral)' }}>*</span></label>
              <select id="homecountry" name="homeCountry" required value={formData.homeCountry} onChange={handleChange}>
                <option value="" disabled>Select your home country</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
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
