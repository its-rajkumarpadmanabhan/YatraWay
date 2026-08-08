import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './BookingCheckout.css';

const BookingCheckout = () => {
  const { user, api } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedTravelers, setSelectedTravelers] = useState({});
  const [paymentOption, setPaymentOption] = useState('card');
  const [passportData, setPassportData] = useState({});
  const [error, setError] = useState(null);

  // Assuming booking destination 1 for this prototype
  const destinationId = 1;
  const destinationCountry = 'Japan'; // This should ideally be fetched from the backend

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const response = await api.get('/family/');
        setFamilyMembers(response.data);
      } catch (err) {
        console.error("Error fetching family members", err);
      }
    };
    if (user) {
      fetchFamily();
    }
  }, [user, api]);

  const goStep = (n) => {
    setCurrentStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTravelerToggle = (id) => {
    setSelectedTravelers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeTravelers = familyMembers.filter(t => selectedTravelers[t.id]);

  const handlePassportChange = (id, value) => {
    setPassportData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckout = async () => {
    // In a real app, we'd send the passport data and payment token
    // For now, let's just trigger the booking endpoint.
    try {
      const payload = {
        destination: destinationId,
        family_members: activeTravelers.map(t => t.id),
        start_date: '2026-10-14',
        end_date: '2026-10-21',
        // In the backend logic, passport_number might be required if destination is international
        passport_number: passportData[activeTravelers[0]?.id] || 'YA1234567' 
      };

      await api.post('/bookings/', payload);
      alert('Booking confirmed! A ticket-stub confirmation has been emailed to you.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.passport_number || 'Booking failed.');
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand"><span className="mark">V</span>Voyage</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="nav-actions">
            <div className="avatar" style={{ width: '38px', height: '38px', fontSize: '13px' }}>U</div>
          </div>
        </div>
      </nav>

      <header className="booking-head">
        <div className="container">
          <h1>Book your trip to Kyoto, Japan</h1>
          <p className="sub">Complete the steps below — your progress is saved automatically.</p>
          <div className="stepper">
            <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'done' : ''}`} data-step="1">
              <span className="num">1</span><span className="label">Dates</span>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : ''}`} data-step="2">
              <span className="num">2</span><span className="label">Travelers</span>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : currentStep > 3 ? 'done' : ''}`} data-step="3">
              <span className="num">3</span><span className="label">Passport info</span>
            </div>
            <div className={`step ${currentStep === 4 ? 'active' : currentStep > 4 ? 'done' : ''}`} data-step="4">
              <span className="num">4</span><span className="label">Payment</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="booking-shell">
          <div>

            {/* STEP 1: DATES */}
            <div className={`step-panel ${currentStep === 1 ? 'active' : ''}`} data-panel="1">
              <div className="panel-card">
                <h3>Choose your travel dates</h3>
                <p className="desc">Prices update automatically based on the dates you select.</p>
                <div className="field-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div className="field"><label>Departure date</label><input type="date" defaultValue="2026-10-14" /></div>
                  <div className="field"><label>Return date</label><input type="date" defaultValue="2026-10-21" /></div>
                  <div className="field"><label>Departure city</label><input type="text" placeholder="e.g. New York (JFK)" /></div>
                  <div className="field">
                    <label>Trip type</label>
                    <select><option>Round trip</option><option>One way</option><option>Multi-city</option></select>
                  </div>
                </div>
                <div className="step-actions"><span></span><button className="btn btn-primary" onClick={() => goStep(2)}>Continue →</button></div>
              </div>
            </div>

            {/* STEP 2: TRAVELERS */}
            <div className={`step-panel ${currentStep === 2 ? 'active' : ''}`} data-panel="2">
              <div className="panel-card">
                <h3>Who's traveling?</h3>
                <p className="desc">Select family members joining this trip. Foreign destinations will ask for passport info in the next step.</p>
                <div className="traveler-list">
                  {familyMembers.map(t => (
                    <label className="traveler-opt" key={t.id}>
                      <input type="checkbox" checked={selectedTravelers[t.id] || false} onChange={() => handleTravelerToggle(t.id)} />
                      <div className="m-avatar">{t.name.substring(0, 2).toUpperCase()}</div>
                      <div className="m-info">
                        <h5>{t.name}</h5>
                        <span className="m-meta">Age {t.age} · {t.relationship}</span>
                      </div>
                      <span className="flag">Family Member</span>
                    </label>
                  ))}
                  {familyMembers.length === 0 && <p>No family members found. Add them in your dashboard!</p>}
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: '6px' }}>+ Add a new family member</button>
                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => goStep(1)}>← Back</button>
                  <button className="btn btn-primary" onClick={() => goStep(3)}>Continue →</button>
                </div>
              </div>
            </div>

            {/* STEP 3: PASSPORT */}
            <div className={`step-panel ${currentStep === 3 ? 'active' : ''}`} data-panel="3">
              <div className="panel-card">
                <h3>Travel document details</h3>
                <p className="desc">Kyoto, Japan may be outside your home country — passport details are required for entry.</p>

                <div className={`passport-block ${activeTravelers.length > 0 ? 'show' : ''}`}>
                  <div className="flag-row">
                    <span className="badge">Passport check</span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Destination: {destinationCountry}</span>
                  </div>
                  <div id="passportEntries">
                    {activeTravelers.map(t => (
                      <div className="passport-entry" key={t.id}>
                        <h6>🛂 {t.name}</h6>
                        <div className="field-grid">
                          <div className="field"><label>Passport number</label><input type="text" placeholder="e.g. YA1234567" value={passportData[t.id] || ''} onChange={e => handlePassportChange(t.id, e.target.value)} /></div>
                          <div className="field"><label>Passport expiry date</label><input type="date" /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: activeTravelers.length === 0 ? 'block' : 'none', padding: '16px', borderRadius: 'var(--radius-m)', background: 'var(--teal-soft)', fontSize: '13.5px', color: '#1B5C4E' }}>
                  No travelers are selected yet — go back to the previous step to choose who's joining.
                </div>

                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => goStep(2)}>← Back</button>
                  <button className="btn btn-primary" onClick={() => goStep(4)}>Continue →</button>
                </div>
              </div>
            </div>

            {/* STEP 4: PAYMENT */}
            <div className={`step-panel ${currentStep === 4 ? 'active' : ''}`} data-panel="4">
              <div className="panel-card">
                <h3>Payment</h3>
                <p className="desc">Your booking is confirmed instantly after payment.</p>
                {error && <div style={{ color: 'var(--coral)', marginBottom: '10px' }}><strong>Error:</strong> {error}</div>}
                
                <div className="pay-options">
                  <div className={`pay-opt ${paymentOption === 'card' ? 'selected' : ''}`} onClick={() => setPaymentOption('card')}>💳 Card</div>
                  <div className={`pay-opt ${paymentOption === 'paypal' ? 'selected' : ''}`} onClick={() => setPaymentOption('paypal')}>🅿️ PayPal</div>
                  <div className={`pay-opt ${paymentOption === 'apple' ? 'selected' : ''}`} onClick={() => setPaymentOption('apple')}>🍏 Apple Pay</div>
                </div>
                <div className="field-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="field" style={{ gridColumn: '1/-1' }}><label>Card number</label><input type="text" placeholder="1234 5678 9012 3456" /></div>
                  <div className="field"><label>Expiry</label><input type="text" placeholder="MM/YY" /></div>
                  <div className="field"><label>CVC</label><input type="text" placeholder="123" /></div>
                  <div className="field" style={{ gridColumn: '1/-1' }}><label>Name on card</label><input type="text" placeholder="Amelia Rossi" /></div>
                </div>
                <label className="checkbox-row" style={{ marginTop: '16px' }}>
                  <input type="checkbox" defaultChecked /> Send booking confirmation and passport reminders to my email
                </label>
                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => goStep(3)}>← Back</button>
                  <button className="btn btn-primary" onClick={handleCheckout}>Confirm & pay $2,480 →</button>
                </div>
              </div>
            </div>

          </div>

          {/* SUMMARY SIDEBAR */}
          <aside className="summary-sticky">
            <div className="ticket summary-ticket">
              <div className="summary-main">
                <h4>Kyoto, Japan</h4>
                <p className="r-loc">Oct 14 → Oct 21, 2026 · 7 nights</p>
                <div className="summary-line"><span>Flights ({activeTravelers.length || 2} travelers)</span><span>$1,240</span></div>
                <div className="summary-line"><span>Hotel · Gion Boutique Inn</span><span>$980</span></div>
                <div className="summary-line"><span>Taxes & fees</span><span>$260</span></div>
                <div className="summary-line total"><span>Total</span><span>$2,480</span></div>
              </div>
              <div className="perf-line"></div>
              <div className="summary-stub">
                <div className="stamp">Voyage<br/>Boarding</div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--ink-soft)', writingMode: 'vertical-rl' }}>KYO · 2026</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default BookingCheckout;
