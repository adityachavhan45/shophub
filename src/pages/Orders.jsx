import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import './Orders.css';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      if (user?._id) {
        const orderData = await userService.getOrders(user._id);
        setOrders(orderData);
      }
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order._id.slice(-6)}</div>
                <div className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                      <div className="item-quantity">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
                <div className="order-status">
                  Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a href="/" className="shop-now-btn">Start Shopping</a>
        </div>
      )}
    </div>
  );
};

export default Orders;
