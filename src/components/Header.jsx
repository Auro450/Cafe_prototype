import React from 'react';
import { ShoppingBag, Menu, ArrowLeft } from 'lucide-react';
import './Header.css';

const Header = ({ cartItemCount = 0, onCartClick, onMenuClick, onBackClick, showBack }) => {
  return (
    <header className="header">
      <div className="header-container">
        {showBack ? (
          <button className="icon-btn menu-btn" aria-label="Back" onClick={onBackClick}>
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
        ) : (
          <button className="icon-btn menu-btn" aria-label="Menu" onClick={onMenuClick}>
            <Menu size={24} strokeWidth={2.5} />
          </button>
        )}

        <div className="logo center-logo">
          <span className="logo-tasty">Tasty</span>
          <span className="logo-foods">FOODS</span>
        </div>

        <div className="cart-wrapper" aria-label="Cart" onClick={onCartClick}>
          <ShoppingBag size={24} className="cart-icon" />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
