import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: user?.preferences?.emailNotifications || false,
    pushNotifications: user?.preferences?.pushNotifications || false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?._id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const orderData = await userService.getOrders(user._id);
      setOrders(orderData);
    } catch (err) {
      setError('Failed to load orders');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await userService.updateProfile(user._id, profileData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await userService.changePassword(user._id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccess('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Failed to change password');
    }
  };

  const handleNotificationUpdate = async (e) => {
    const { name, checked } = e.target;
    try {
      const newPreferences = { ...notifications, [name]: checked };
      await userService.updateNotificationPreferences(user._id, newPreferences);
      setNotifications(newPreferences);
      setSuccess('Notification preferences updated');
    } catch (err) {
      setError('Failed to update notification preferences');
    }
  };

  const renderProfile = () => (
    <div className="profile-section">
      {isEditing ? (
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="orders-section">
      <h3>Order History</h3>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <span>Order #{order._id.slice(-6)}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-details">
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="password-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
          </div>
          <button type="submit" className="change-password-btn">Change Password</button>
        </form>
      </div>

      <div className="notifications-section">
        <h3>Notification Preferences</h3>
        <div className="notification-options">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationUpdate}
              />
              Email Notifications
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notifications.pushNotifications}
                onChange={handleNotificationUpdate}
              />
              Push Notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="user-profile">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default UserProfile;
