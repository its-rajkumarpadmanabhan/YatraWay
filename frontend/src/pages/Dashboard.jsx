import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, api, logoutUser } = useContext(AuthContext);
  
  // Try to load basic profile info if you have a me endpoint, otherwise use placeholder
  const [personalDetails, setPersonalDetails] = useState({
    firstName: 'Amelia',
    lastName: 'Rossi',
    email: 'amelia.rossi@email.com',
    phone: '+39 345 019 2231',
    dob: '1991-06-14',
    homeCountry: 'Italy',
    passportNumber: 'YA1234567'
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', age: '', relationship: 'Spouse' });

  // Fetch family members on mount
  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const response = await api.get('/family/');
        setFamilyMembers(response.data);
      } catch (err) {
        console.error("Error fetching family members", err);
      }
    };
    fetchFamily();
  }, [api]);

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.age) return;
    
    try {
      const payload = {
        name: newMember.name,
        age: parseInt(newMember.age),
        relationship: newMember.relationship,
      };
      
      const response = await api.post('/family/', payload);
      setFamilyMembers([...familyMembers, response.data]);
      
      setNewMember({ name: '', age: '', relationship: 'Spouse' });
      setIsAddingMember(false);
    } catch (error) {
      console.error("Error adding family member", error);
    }
  };

  const removeMember = async (id) => {
    try {
      await api.delete(`/family/${id}/`);
      setFamilyMembers(familyMembers.filter(m => m.id !== id));
    } catch (error) {
      console.error("Error deleting family member", error);
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
            <a onClick={logoutUser}>🚪 Log out</a>
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
                  <div className="m-avatar">{member.name.substring(0, 2).toUpperCase()}</div>
                  <div className="m-info">
                    <h5>{member.name}</h5>
                    <div className="m-meta">
                      <span>Age {member.age}</span><span>·</span><span>{member.relationship}</span><span>·</span>
                      <span className="tag-pill">Family Member</span>
                    </div>
                  </div>
                  <div className="m-actions">
                    <button>Edit</button>
                    <button onClick={() => removeMember(member.id)}>Remove</button>
                  </div>
                </div>
              ))}
              {familyMembers.length === 0 && <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>No family members added yet.</p>}
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
