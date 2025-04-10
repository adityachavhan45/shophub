import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserMenu.css';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="user-menu" ref={dropdownRef}>
      {user ? (
        <>
          <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user.name}</span>
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              <div className="user-info">
                <div className="user-avatar large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <span className="icon">👤</span> My Profile
              </Link>
              <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <span className="icon">📦</span> My Orders
              </Link>
              <Link to="/wishlist" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <span className="icon">❤️</span> Wishlist
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <span className="icon">⚙️</span> Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <span className="icon">🚪</span> Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login">Login</Link>
          <Link to="/register" className="auth-button register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
