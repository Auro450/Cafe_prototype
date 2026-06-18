import React, { useState } from 'react';

const AccountPage = ({ isLoggedIn, userPhone, userName, setUserName, userAddress, setUserAddress, isProfileSaved, setIsProfileSaved, onLogin, onLogout }) => {
  const [tempName, setTempName] = useState(userName);
  const [tempAddress, setTempAddress] = useState(userAddress);

  const handleSave = () => {
    if (!tempName.trim()) {
      alert("Please enter your name.");
      return;
    }
    setUserName(tempName);
    setUserAddress(tempAddress);
    setIsProfileSaved(true);
  };

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>Account Details</h2>
      
      {!isLoggedIn ? (
        <div style={{ background: 'white', padding: '30px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>You are currently browsing as a guest.</p>
          <button 
            onClick={onLogin}
            style={{ background: 'var(--primary-red, #E60000)', color: 'white', padding: '14px 24px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '1rem', width: '100%', cursor: 'pointer' }}
          >
            Login / Sign Up
          </button>
        </div>
      ) : !isProfileSaved ? (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '1.05rem', color: '#444', marginBottom: '20px', fontWeight: 600 }}>Complete Your Profile</p>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Full Name</label>
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)} 
              placeholder="Enter your name"
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Phone Number</label>
            <input 
              type="text" 
              value={userPhone} 
              readOnly 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #eee', fontSize: '1rem', background: '#f5f5f5', color: '#888', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Delivery Address (Optional)</label>
            <textarea 
              value={tempAddress} 
              onChange={(e) => setTempAddress(e.target.value)} 
              placeholder="Enter your complete address"
              rows="3"
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', resize: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <button 
            onClick={handleSave}
            style={{ background: 'var(--primary-yellow, #FFB800)', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '1.05rem', width: '100%', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 184, 0, 0.3)' }}
          >
            Save Details
          </button>
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ffe5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '1.5rem', fontWeight: 800 }}>
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#222' }}>{userName}</p>
              <p style={{ fontSize: '1rem', color: '#666', marginTop: '4px' }}>{userPhone}</p>
            </div>
          </div>
          
          <div style={{ padding: '16px', background: '#eef8e6', color: '#3a7d00', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Account verified & active
          </div>

          <button 
            onClick={() => setIsProfileSaved(false)}
            style={{ marginTop: '20px', background: 'transparent', color: 'var(--primary-red)', border: '1px solid var(--primary-red)', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', width: '100%', cursor: 'pointer' }}
          >
            Edit Profile
          </button>
          
          <button 
            onClick={onLogout}
            style={{ marginTop: '12px', background: '#f5f5f5', color: '#666', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', width: '100%', cursor: 'pointer' }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
