import React from 'react';
import './AboutSection.css';

const features = [
  {
    icon: '🍽️',
    title: 'Luscious Dishes',
    desc: 'Finger-licking goodness in every single bite.'
  },
  {
    icon: '✨',
    title: 'Hygiene First',
    desc: 'Strict cleanliness standards for your safety.'
  },
  {
    icon: '🛵',
    title: 'Fast Delivery',
    desc: 'Hot and fresh food delivered reliably to your door. Free delivery above Rs. 99/-'
  },
  {
    icon: '🎯',
    title: 'Best Hangout',
    desc: 'The perfect spot to chill with your friends.'
  }
];

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="custom-promo-banner">
        <div className="promo-background"></div>
        <img src="/products/product_chicken_burger.webp" className="promo-img promo-burger" alt="Burger" loading="lazy" />
        <img src="/products/product_veg_sandwich.webp" className="promo-img promo-sandwich" alt="Sandwich" loading="lazy" />
        <div className="promo-content">
          <span className="promo-highlight">Flat 20% Off</span>
          <span className="promo-subtext">On your first online order</span>
        </div>
      </div>

      <div className="about-content">
        <h2 className="about-title">Why Choose Tasty Foods?</h2>
        <p className="about-subtitle">We give you every reason to keep coming back for more.</p>

        <div className="features-list">
          {features.map((feature, index) => (
            <div key={index} className="feature-row">
              <div className="feature-icon-box">{feature.icon}</div>
              <div className="feature-text">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
