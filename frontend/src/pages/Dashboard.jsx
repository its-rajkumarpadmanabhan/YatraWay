import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: 'Amelia',
    lastName: 'Rossi',
    email: 'amelia.rossi@email.com',
    phone: '+39 345 019 2231',
    dob: '1991-06-14',
    homeCountry: 'Italy',
    passportNumber: 'YA1234567'
  });

  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Luca Rossi', age: 8, relationship: 'Son', initials: 'LR', badgeInfo: '🇮🇹 Italy' },
    { id: 2, name: 'Marco Bianchi', age: 45, relationship: 'Spouse', initials: 'MB', badgeInfo: '🇮🇹 Italy' },
    { id: 3, name: 'Giulia Rossi', age: 73, relationship: 'Mother', initials: 'GR', badgeInfo: '🇺🇸 USA', badgeClass: 'coral' }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', age: '', relationship: 'Spouse' });

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.age) return;
    
    const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2);
    
    setFamilyMembers([
      ...familyMembers, 
      { 
        id: Date.now(), 
        name: newMember.name, 
        age: parseInt(newMember.age), 
        relationship: newMember.relationship, 
        initials,
        badgeInfo: `🇮🇹 ${personalDetails.homeCountry}` 
      }
    ]);
    
    setNewMember({ name: '', age: '', relationship: 'Spouse' });
    setIsAddingMember(false);
  };

  const removeMember = (id) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
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
            <Link to="/dashboard" className="active">Dashboard</Link>
          </div>
          <div className="nav-actions">
            <div className="icon-btn">🔔</div>
            <div className="avatar" style={{ width: '38px', height: '38px', fontSize: '14px', margin: 0 }}>
              {personalDetails.firstName[0]}{personalDetails.lastName[0]}
            </div>
          </div>
        </div>
      </nav>

      <div className="dash-shell">
        <aside className="dash-side">
          <div className="profile-card">
            <div className="avatar">{personalDetails.firstName[0]}{personalDetails.lastName[0]}</div>
            <h4>{personalDetails.firstName} {personalDetails.lastName}</h4>
            <p>Home: 🇮🇹 {personalDetails.homeCountry}</p>
          </div>
          <nav className="dash-nav">
            <a className="active">👤 Personal details</a>
            <a>👨‍👩‍👧 Family members</a>
            <a>🧳 My bookings</a>
            <a>🛂 Passport & documents</a>
            <a>⚙️ Settings</a>
            <Link to="/">🚪 Log out</Link>
          </nav>
        </aside>

        <main className="dash-main">
          <section className="panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Account</span>
                <h3 style={{ marginTop: '8px' }}>Personal details</h3>
                <p>This information is used to pre-fill your bookings and check passport requirements.</p>
              </div>
              <button className="btn btn-dark btn-sm">Save changes</button>
            </div>

            <form>
              <div className="field-grid">
                <div className="field">
                  <label>First name</label>
                  <input type="text" name="firstName" value={personalDetails.firstName} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="field">
                  <label>Last name</label>
                  <input type="text" name="lastName" value={personalDetails.lastName} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" name="email" value={personalDetails.email} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={personalDetails.phone} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="field">
                  <label>Date of birth</label>
                  <input type="date" name="dob" value={personalDetails.dob} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="field">
                  <label>Home country</label>
                  <select name="homeCountry" value={personalDetails.homeCountry} onChange={handlePersonalDetailsChange}>
                    <option value="Italy">Italy</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="field full">
                  <label>Passport number</label>
                  <input type="text" name="passportNumber" value={personalDetails.passportNumber} onChange={handlePersonalDetailsChange} placeholder="e.g. YA1234567" />
                </div>
              </div>
            </form>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Travel group</span>
                <h3 style={{ marginTop: '8px' }}>Family members</h3>
                <p>Add family members once — reuse them when booking any trip.</p>
              </div>
              <button className="btn btn-primary btn-sm toggle-add" onClick={() => setIsAddingMember(!isAddingMember)}>
                {isAddingMember ? '- Cancel' : '+ Add member'}
              </button>
            </div>

            <div className="member-list">
              {familyMembers.map((member) => (
                <div className="member-row" key={member.id}>
                  <div className="m-avatar">{member.initials}</div>
                  <div className="m-info">
                    <h5>{member.name}</h5>
                    <div className="m-meta">
                      <span>Age {member.age}</span><span>·</span><span>{member.relationship}</span><span>·</span>
                      <span className={`tag-pill ${member.badgeClass || ''}`}>{member.badgeInfo}</span>
                    </div>
                  </div>
                  <div className="m-actions">
                    <button>Edit</button>
                    <button onClick={() => removeMember(member.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <form className={`add-member-form ${isAddingMember ? 'open' : ''}`} onSubmit={handleAddMember}>
              <div className="field">
                <label>Full name</label>
                <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} />
              </div>
              <div className="field">
                <label>Age</label>
                <input type="number" placeholder="Age" min="0" value={newMember.age} onChange={(e) => setNewMember({...newMember, age: e.target.value})} />
              </div>
              <div className="field">
                <label>Relationship</label>
                <select value={newMember.relationship} onChange={(e) => setNewMember({...newMember, relationship: e.target.value})}>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-dark btn-sm">Save member</button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
