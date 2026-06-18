import React from 'react';
import './CateringSection.css';

const CateringSection = ({ onNavigate }) => {
  return (
    <section className="catering-section">
      <div className="catering-banner">
        <div className="catering-overlay"></div>
        <div className="catering-content">
          <div className="catering-badge">Premium Service</div>
          <h2 className="catering-title">Catering & Events</h2>
          <p className="catering-subtitle">
            Corporate • Weddings • Parties
          </p>
          <p className="catering-desc">
            Elevate your special occasions with our premium catering services. Let us handle the food while you enjoy the moment.
          </p>
          <button 
            className="catering-btn" 
            onClick={() => onNavigate('cateringForm')}
          >
            Submit Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
