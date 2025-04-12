import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About ShopHub</h3>
          <p>Your one-stop destination for all your shopping needs. We provide high-quality products at competitive prices.</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook">📘</i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter">🐦</i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram">📸</i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Design & Develop By Aditya Chavhan</p>
        <div className="payment-methods">
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>💳 PayPal</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
