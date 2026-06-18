import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AuthBottomSheet.css';

const AuthBottomSheet = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setError('Please fill in both fields');
      return;
    }
    // Simulate successful login or signup
    setError('');
    onLoginSuccess(phone);
  };

  return (
    <>
      <div className="auth-backdrop" onClick={onClose}></div>
      <div className="auth-bottom-sheet slide-up">
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button className="auth-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <p className="auth-subtitle">
          {mode === 'login' 
            ? 'Welcome back! Please login to place your order.' 
            : 'Join us to place your order and earn rewards!'}
        </p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="auth-input-group">
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="auth-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
              pattern="[0-9]*"
            />
          </div>
          <div className="auth-input-group">
            <input 
              type="password" 
              placeholder={mode === 'login' ? 'Password' : 'Choose Password'}
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch-mode">
          {mode === 'login' ? (
            <p>New here? <span onClick={() => { setMode('signup'); setError(''); setPhone(''); setPassword(''); }}>Sign up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => { setMode('login'); setError(''); setPhone(''); setPassword(''); }}>Login</span></p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthBottomSheet;
