import React, { useState } from 'react';
import './ComboSection.css';

const comboData = [
  {
    id: 'combo1',
    name: 'Classic Meal',
    desc: 'Chicken Burger + Cold Coffee',
    price: 250,
    images: ['/products/product_chicken_burger.webp', '/products/product_cold_coffee.webp'],
    theme: 'yellow'
  },
  {
    id: 'combo2',
    name: 'Snack Pack',
    desc: 'French Fries + Ice Tea',
    price: 180,
    images: ['/products/product_french_fries.webp', '/products/product_ice_tea.webp'],
    theme: 'red'
  },
  {
    id: 'combo3',
    name: 'Morning Start',
    desc: 'Veg Sandwich + Masala Tea',
    price: 110,
    images: ['/products/product_veg_sandwich.webp', '/products/product_masala_tea.webp'],
    theme: 'yellow'
  },
  {
    id: 'combo4',
    name: 'Jumbo Feast',
    desc: 'Jumbo Burger + Virgin Mojito',
    price: 280,
    images: ['/products/product_jumbo_burger.webp', '/products/product_virgin_mojito.webp'],
    theme: 'red'
  }
];

const ComboSection = ({ getQuantity, onUpdateQuantity }) => {
  const handleIncrement = (combo) => {
    // Add an image property for the cart to render
    const cartItem = { ...combo, image: combo.images[0] };
    onUpdateQuantity(cartItem, getQuantity(combo.id) + 1);
  };

  const handleDecrement = (combo) => {
    const cartItem = { ...combo, image: combo.images[0] };
    onUpdateQuantity(cartItem, getQuantity(combo.id) - 1);
  };

  return (
    <section className="combo-section">
      <div className="combo-header">
        <h2 className="combo-section-title">Special Combos</h2>
      </div>
      
      <div className="combo-scroll-container">
        <div className="combo-list">
          {comboData.map(combo => {
            const qty = getQuantity(combo.id);
            return (
              <div key={combo.id} className={`combo-card theme-${combo.theme}`}>
                <div className="combo-image-box">
                  <img src={combo.images[0]} alt="Item 1" className="combo-img img-back" loading="lazy" />
                  <img src={combo.images[1]} alt="Item 2" className="combo-img img-front" loading="lazy" />
                </div>
                
                <div className="combo-details">
                  <h3 className="combo-name">{combo.name}</h3>
                  <p className="combo-desc">{combo.desc}</p>
                  
                  <div className="combo-bottom-row">
                    <span className="combo-price">₹{combo.price}</span>
                    
                    <div className="combo-action">
                      {qty === 0 ? (
                        <button className="combo-add-btn" onClick={() => handleIncrement(combo)}>
                          Add
                        </button>
                      ) : (
                        <div className="combo-qty-control">
                          <button className="combo-qty-btn" onClick={() => handleDecrement(combo)}>−</button>
                          <span className="combo-qty-value">{qty}</span>
                          <button className="combo-qty-btn" onClick={() => handleIncrement(combo)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;
