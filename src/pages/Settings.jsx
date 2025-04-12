import React, { useState } from 'react';
import { userService } from '../services/userService';
import './Settings.css';

const Settings = ({ user }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: user?.preferences?.emailNotifications || false,
    pushNotifications: user?.preferences?.pushNotifications || false,
    orderUpdates: user?.preferences?.orderUpdates || false,
    promotions: user?.preferences?.promotions || false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Change Password</button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="notification-preferences">
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationUpdate}
              />
              Email Notifications
            </label>
            <p className="preference-description">Receive updates via email</p>
          </div>

          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notifications.pushNotifications}
                onChange={handleNotificationUpdate}
              />
              Push Notifications
            </label>
            <p className="preference-description">Receive notifications on your device</p>
          </div>

          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                name="orderUpdates"
                checked={notifications.orderUpdates}
                onChange={handleNotificationUpdate}
              />
              Order Updates
            </label>
            <p className="preference-description">Get notified about your order status</p>
          </div>

          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                name="promotions"
                checked={notifications.promotions}
                onChange={handleNotificationUpdate}
              />
              Promotional Updates
            </label>
            <p className="preference-description">Receive special offers and promotions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
