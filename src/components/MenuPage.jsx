import React, { useState } from 'react';
import { categoriesData, productsData } from '../data';
import './MenuPage.css';

const MenuPage = ({ getQuantity, onUpdateQuantity }) => {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].id);

  const products = productsData[activeCategory] || [];

  const handleIncrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) + 1);
  };

  const handleDecrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) - 1);
  };

  return (
    <div className="menu-page">
      {/* Left Sidebar for Categories */}
      <div className="menu-sidebar">
        {categoriesData.map((cat) => (
          <button 
            key={cat.id} 
            className={`menu-sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <div className="menu-sidebar-img-wrapper">
              <img src={cat.image} alt={cat.name} className="menu-sidebar-img" />
            </div>
            <span className="menu-sidebar-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Right Content Area for Products */}
      <div className="menu-content">
        <h2 className="menu-category-title">{categoriesData.find(c => c.id === activeCategory)?.name}</h2>
        <div className="menu-product-list">
          {products.map((product) => {
            const qty = getQuantity(product.id);
            return (
              <div key={product.id} className="menu-product-card">
                <div className="menu-product-img-wrapper">
                  <img src={product.image} alt={product.name} className="menu-product-img" />
                </div>
                <div className="menu-product-details">
                  <h3 className="menu-product-name">{product.name}</h3>
                  {product.desc && <p className="menu-product-desc" style={{fontSize: '0.8rem', color: '#888', marginBottom: '8px'}}>{product.desc}</p>}
                  <p className="menu-product-price">₹{product.price}</p>
                  
                  <div className="menu-product-action">
                    {qty === 0 ? (
                      <button className="menu-add-btn" onClick={() => handleIncrement(product)}>Add</button>
                    ) : (
                      <div className="menu-qty-control">
                        <button className="menu-qty-btn" onClick={() => handleDecrement(product)}>−</button>
                        <span className="menu-qty-value">{qty}</span>
                        <button className="menu-qty-btn" onClick={() => handleIncrement(product)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
