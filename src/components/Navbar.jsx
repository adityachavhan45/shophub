import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import './Navbar.css';

const Navbar = ({ cartCount, onSearch, user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">Shophub</Link>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
        <Link to="/cart" className="nav-link cart">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* ✅ Show UserMenu if user is logged in */}
        {user ? (
          <UserMenu user={user} onLogout={onLogout} />
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
