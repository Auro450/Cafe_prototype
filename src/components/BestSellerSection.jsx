import React, { useState } from 'react';
import './BestSellerSection.css';

const bestSellers = [
  { id: 'bs1', name: 'Chicken Burger', price: 120, image: '/products/product_chicken_burger.webp', category: 'Burger' },
  { id: 'bs2', name: 'Veg Sandwich', price: 70, image: '/products/product_veg_sandwich.webp', category: 'Sandwich' },
  { id: 'bs3', name: 'French Fries', price: 90, image: '/products/product_french_fries.webp', category: 'Fries' },
  { id: 'bs4', name: 'Cold Coffee', price: 110, image: '/products/product_cold_coffee.webp', category: 'Coffee' },
  { id: 'bs5', name: 'L.I.I.T', price: 150, image: '/products/product_liit.webp', category: 'Beverage' },
  { id: 'bs6', name: 'Masala Tea', price: 40, image: '/products/product_masala_tea.webp', category: 'Tea' },
];

const BestSellerSection = ({ getQuantity, onUpdateQuantity }) => {
  const handleIncrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) + 1);
  };

  const handleDecrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) - 1);
  };

  return (
    <section className="bestseller-section">
      <div className="bestseller-header">
        <h2 className="bestseller-title">Our Best Sellers</h2>
        <p className="bestseller-subtitle">Crowd favorites from every category</p>
      </div>

      <div className="bestseller-grid">
        {bestSellers.map(product => {
          const qty = getQuantity(product.id);
          return (
            <div key={product.id} className="bs-card">
              <div className="bs-badge">
                <span className="bs-badge-icon">👑</span>
                {product.category}
              </div>
              
              <div className="bs-image-container">
                <img src={product.image} alt={product.name} className="bs-image" loading="lazy" />
              </div>
              
              <div className="bs-details">
                <h3 className="bs-name">{product.name}</h3>
                
                <div className="bs-bottom">
                  <span className="bs-price">₹{product.price}</span>
                  
                  {qty === 0 ? (
                    <button className="bs-add-btn" onClick={() => handleIncrement(product)}>
                      +
                    </button>
                  ) : (
                    <div className="bs-qty-control">
                      <button className="bs-qty-btn" onClick={() => handleDecrement(product)}>−</button>
                      <span className="bs-qty-value">{qty}</span>
                      <button className="bs-qty-btn" onClick={() => handleIncrement(product)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellerSection;
