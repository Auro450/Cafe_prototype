import React, { useState, useEffect } from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, getQuantity, onUpdateQuantity, totalPrice, isLoggedIn, userPhone, onTriggerAuth, onCheckout }) => {
  const [orderType, setOrderType] = useState('takeaway'); // 'delivery', 'dinein', 'takeaway'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(userPhone || '');
  const [address, setAddress] = useState('');
  const [tableNo, setTableNo] = useState('1');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (isLoggedIn && userPhone) {
      setPhone(userPhone);
    }
  }, [isLoggedIn, userPhone]);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FLAT20') {
      setDiscount(totalPrice * 0.2);
      alert('Coupon Applied Successfully!');
    } else if (couponCode.trim().length > 0) {
      alert('Invalid Coupon Code');
      setDiscount(0);
    }
  };

  const finalPrice = Math.max(0, totalPrice - discount);

  const handlePlaceOrderClick = () => {
    if (!isLoggedIn) {
      onTriggerAuth();
    } else {
      onCheckout(finalPrice, orderType);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <img src="/assets/empty-cart.png" alt="Empty Cart" className="empty-cart-img" onError={(e) => e.target.style.display = 'none'} />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  const handleIncrement = (product) => onUpdateQuantity(product, getQuantity(product.id) + 1);
  const handleDecrement = (product) => onUpdateQuantity(product, getQuantity(product.id) - 1);

  return (
    <div className="cart-page">
      <h2 className="cart-title">Order Summary</h2>
      
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <div className="cart-item-img-wrapper">
              <img src={item.image} alt={item.name} className="cart-item-img" />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">₹{item.price}</p>
            </div>
            <div className="cart-item-qty-control">
              <button className="cart-qty-btn" onClick={() => handleDecrement(item)}>−</button>
              <span className="cart-qty-value">{item.quantity}</span>
              <button className="cart-qty-btn" onClick={() => handleIncrement(item)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="coupon-section" style={{ marginTop: '0', marginBottom: '32px' }}>
        <input 
          type="text" 
          className="coupon-input" 
          placeholder="ENTER COUPON CODE" 
          value={couponCode} 
          onChange={(e) => setCouponCode(e.target.value)} 
        />
        <button className="coupon-apply-btn" onClick={handleApplyCoupon}>Apply</button>
      </div>

      <div className="order-options-section" style={{ marginTop: '0' }}>
        <h3 className="section-subtitle">Dining Preference</h3>
        <div className="order-type-tabs">
          <button 
            className={`type-tab ${orderType === 'delivery' ? 'active' : ''}`}
            onClick={() => setOrderType('delivery')}
          >
            Delivery
          </button>
          <button 
            className={`type-tab ${orderType === 'dinein' ? 'active' : ''}`}
            onClick={() => setOrderType('dinein')}
          >
            Dine-In
          </button>
          <button 
            className={`type-tab ${orderType === 'takeaway' ? 'active' : ''}`}
            onClick={() => setOrderType('takeaway')}
          >
            Takeaway
          </button>
        </div>

        <div className="order-details-form">
          {/* Common fields for all order types */}
          <div className="form-group slide-in">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="tel" 
              className="form-input" 
              placeholder="Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
              maxLength={10}
              pattern="[0-9]*"
              readOnly={isLoggedIn}
              style={isLoggedIn ? { backgroundColor: '#f5f5f5', color: '#888', cursor: 'not-allowed', borderColor: '#eee' } : {}}
            />
          </div>

          {orderType === 'delivery' && (
            <div className="form-group slide-in" style={{marginTop: '12px'}}>
              <textarea 
                className="form-input form-textarea" 
                placeholder="Complete Delivery Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
          )}

          {orderType === 'dinein' && (
            <div className="form-group slide-in" style={{marginTop: '12px'}}>
              <label className="form-label">Select Table Number</label>
              <select 
                className="form-select" 
                value={tableNo} 
                onChange={(e) => setTableNo(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>Table {num}</option>
                ))}
              </select>
            </div>
          )}

          {orderType === 'takeaway' && (
            <div className="form-group slide-in" style={{marginTop: '12px'}}>
              <p className="helper-text">Pick up your order from the counter when it's ready!</p>
            </div>
          )}
        </div>
      </div>

      <div className="cart-bottom-bar">
        {discount > 0 && (
          <div className="cart-total-box discount-row">
            <span className="cart-total-label">Discount</span>
            <span className="discount-text">-₹{discount.toFixed(0)}</span>
          </div>
        )}
        <div className="cart-total-box">
          <span className="cart-total-label">Total to pay</span>
          <span className="cart-total-value">₹{finalPrice.toFixed(0)}</span>
        </div>
        <button 
          className="place-order-btn" 
          onClick={handlePlaceOrderClick}
          disabled={isLoggedIn && (!name || !phone || (orderType === 'delivery' && !address))}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
