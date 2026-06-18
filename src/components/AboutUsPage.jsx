import React from 'react';
import { MapPin, Phone, Coffee } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto', background: '#fcfcfc' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: '#ffe5e5', color: '#e60000', marginBottom: '16px' }}>
          <Coffee size={40} />
        </div>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '2.2rem', fontWeight: 800, color: '#222', marginBottom: '8px' }}>Tasty Foods</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Serving joy, one bite at a time.</p>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>Contact Information</h2>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ color: '#e60000', marginTop: '2px' }}><MapPin size={24} /></div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '4px' }}>Address</h3>
            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5 }}>
              123 Flavor Street, Foodie Lane<br />
              Culinary District, City 40001<br />
              India
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ color: '#e60000', marginTop: '2px' }}><Phone size={24} /></div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '4px' }}>Phone Number</h3>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
