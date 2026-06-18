import React from 'react';
import { productsData } from '../data';
import './ProductList.css';

const ProductList = ({ activeCategory, getQuantity, onUpdateQuantity }) => {
  const products = productsData[activeCategory] || [];

  const handleIncrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) + 1);
  };

  const handleDecrement = (product) => {
    onUpdateQuantity(product, getQuantity(product.id) - 1);
  };

  return (
    <div className="product-section">
      <div className="product-list">
        {products.map((product) => {
          const qty = getQuantity(product.id);
          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <div className="product-action">
                  {qty === 0 ? (
                    <button className="add-btn" onClick={() => handleIncrement(product)}>
                      Add
                    </button>
                  ) : (
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => handleDecrement(product)}>−</button>
                      <span className="qty-value">{qty}</span>
                      <button className="qty-btn" onClick={() => handleIncrement(product)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
