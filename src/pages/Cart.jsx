import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import './Cart.css';

const Cart = ({ user, onUpdateCart }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    const priceInRupees = price * 83;
    return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cart = await cartService.getCart(user.id);
          setItems(cart.items || []);
        } catch (err) {
          setError('Failed to load cart items');
          console.error('Error loading cart:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [user]);

  const updateItemQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const updatedItems = items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      const result = await cartService.updateCart(user.id, updatedItems);
      setItems(result.items);
      onUpdateCart && onUpdateCart(result);
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const updatedItems = items.filter(item => item.productId !== productId);
      const result = await cartService.updateCart(user.id, updatedItems);
      setItems(result.items);
      onUpdateCart && onUpdateCart(result);
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
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

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Loading cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <h2>{error}</h2>
        <button className="primary-button" onClick={() => window.location.reload()}>
          Try Again
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
                  <button 
                    className="quantity-button"
                    onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-button"
                    onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => removeItem(item.productId)}
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
