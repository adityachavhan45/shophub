import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/storage';
import './Cart.css';

const Cart = ({ user, onUpdateCart }) => {
  const navigate = useNavigate();

  const handleQuantityChange = async (item, newQuantity) => {
    if (!user) return;

    try {
      const currentCart = await cartService.getCart(user.id);
      let updatedItems;

      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        updatedItems = currentCart.items.filter(cartItem => cartItem.productId !== item.productId);
      } else {
        // Update quantity
        updatedItems = currentCart.items.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      }

      const result = await cartService.updateCart(user.id, updatedItems);
      onUpdateCart && onUpdateCart(result);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveItem = async (item) => {
    await handleQuantityChange(item, 0);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    // Convert USD to INR (approximate rate: 1 USD = 83 INR)
    const priceInRupees = price * 83;
    return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

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

  const cart = cartService.getCart(user.id);
  const items = cart?.items || [];

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
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span>{formatPrice(calculateTotal(items))}</span>
          </div>
          <button className="checkout-button">
            Proceed to Checkout
          </button>
          <button
            className="continue-shopping"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
