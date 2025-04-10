import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ user }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const priceInRupees = price * 83;
    return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Simulated cart items (static or fetched from a fake hook/state)
  const items = []; // Empty cart for now, you can mock data here if needed

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Please login to view your cart</h2>
        <button className="primary-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty</h2>
        <button className="primary-button" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button className="quantity-button">-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-button">+</button>
                </div>
                <button className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span>{formatPrice(calculateTotal(items))}</span>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
