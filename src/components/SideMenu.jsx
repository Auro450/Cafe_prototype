import React from 'react';
import { User, Package, Home, List, X } from 'lucide-react';
import './SideMenu.css';

const SideMenu = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="side-menu-backdrop" onClick={onClose}></div>
      <div className="side-menu slide-in-left">
        <div className="side-menu-header">
          <h2>Tasty Foods</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="side-menu-items">
          <button className="side-menu-item" onClick={() => onNavigate('home')}>
            <Home size={20} className="side-menu-icon" />
            <span>Home</span>
          </button>

          <button className="side-menu-item" onClick={() => onNavigate('menu')}>
            <List size={20} className="side-menu-icon" />
            <span>Menu</span>
          </button>

          <button className="side-menu-item" onClick={() => onNavigate('account')}>
            <User size={20} className="side-menu-icon" />
            <span>Account</span>
          </button>
          
          <button className="side-menu-item" onClick={() => onNavigate('orders')}>
            <Package size={20} className="side-menu-icon" />
            <span>My orders</span>
          </button>

          <button className="side-menu-item" onClick={() => onNavigate('about')}>
            <List size={20} className="side-menu-icon" />
            <span>About Us</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
