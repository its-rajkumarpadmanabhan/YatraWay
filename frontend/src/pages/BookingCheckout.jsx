import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingCheckout.css';

const BookingCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTravelers, setSelectedTravelers] = useState([
    { id: 1, name: 'Amelia Rossi (You)', country: 'Italy', checked: true, age: 34, relation: 'Account holder', initials: 'AR' },
    { id: 2, name: 'Marco Bianchi', country: 'Italy', checked: true, age: 45, relation: 'Spouse', initials: 'MB' },
    { id: 3, name: 'Luca Rossi', country: 'Italy', checked: false, age: 8, relation: 'Son', initials: 'LR' },
    { id: 4, name: 'Giulia Rossi', country: 'USA', checked: false, age: 73, relation: 'Mother', initials: 'GR' }
  ]);
  const [paymentOption, setPaymentOption] = useState('card');

  const goStep = (n) => {
    setCurrentStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTravelerToggle = (id) => {
    setSelectedTravelers(selectedTravelers.map(t => 
      t.id === id ? { ...t, checked: !t.checked } : t
    ));
  };

  const activeTravelers = selectedTravelers.filter(t => t.checked);

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
            <div className="avatar" style={{ width: '38px', height: '38px', fontSize: '13px' }}>AR</div>
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
                  {selectedTravelers.map(t => (
                    <label className="traveler-opt" key={t.id}>
                      <input type="checkbox" checked={t.checked} onChange={() => handleTravelerToggle(t.id)} />
                      <div className="m-avatar">{t.initials}</div>
                      <div className="m-info">
                        <h5>{t.name}</h5>
                        <span className="m-meta">Age {t.age} · {t.relation}</span>
                      </div>
                      <span className="flag">{t.country === 'USA' ? '🇺🇸' : '🇮🇹'} {t.country}</span>
                    </label>
                  ))}
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
                <p className="desc">Kyoto, Japan is outside every traveler's home country selected — passport details are required for entry.</p>

                <div className={`passport-block ${activeTravelers.length > 0 ? 'show' : ''}`}>
                  <div className="flag-row">
                    <span className="badge">Passport required</span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Destination: Japan (foreign to all selected travelers)</span>
                  </div>
                  <div id="passportEntries">
                    {activeTravelers.map(t => (
                      <div className="passport-entry" key={t.id}>
                        <h6>🛂 {t.name} <span className="tag-pill" style={{ marginLeft: 'auto' }}>{t.country}</span></h6>
                        <div className="field-grid">
                          <div className="field"><label>Passport number</label><input type="text" placeholder="e.g. YA1234567" /></div>
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
                  <button className="btn btn-primary" onClick={() => alert('Booking confirmed! A ticket-stub confirmation has been emailed to you.')}>Confirm & pay $2,480 →</button>
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
                <div className="summary-line"><span>Flights (2 adults)</span><span>$1,240</span></div>
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
