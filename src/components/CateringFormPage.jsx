import React, { useState } from 'react';

const CateringFormPage = ({ isLoggedIn, userPhone, userName, onSubmitRequest, onTriggerAuth }) => {
  const [name, setName] = useState(userName || '');
  const [phone, setPhone] = useState(userPhone || '');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !details.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    
    if (!isLoggedIn) {
      onTriggerAuth();
      return;
    }

    onSubmitRequest({
      name,
      phone,
      details,
      date: new Date().toLocaleString(),
      status: 'New Request'
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#eef8e6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#3a7d00' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>Request Received!</h2>
        <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.5 }}>
          Thank you, {name}! Your catering request has been sent to our management team. We will contact you at {phone} shortly.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Catering Request</h2>
      <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px' }}>Fill out the details below and we'll help make your event unforgettable.</p>

      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px', fontWeight: 600 }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px', fontWeight: 600 }}>Phone Number</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
            placeholder="Enter your phone number"
            maxLength={10}
            readOnly={isLoggedIn}
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #eee', 
              fontSize: '1rem',
              ...(isLoggedIn ? { background: '#f5f5f5', color: '#888', cursor: 'not-allowed' } : {})
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '8px', fontWeight: 600 }}>Event Details</label>
          <textarea 
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
            placeholder="Tell us about the event type, date, expected guests, and menu preferences..."
            rows="5"
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <button 
          onClick={handleSubmit}
          style={{ 
            background: 'var(--primary-red, #E60000)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: 700, 
            fontSize: '1.05rem', 
            width: '100%', 
            cursor: 'pointer', 
            boxShadow: '0 4px 15px rgba(230, 0, 0, 0.3)' 
          }}
        >
          {isLoggedIn ? "Submit Details" : "Login to Submit"}
        </button>
      </div>
    </div>
  );
};

export default CateringFormPage;
