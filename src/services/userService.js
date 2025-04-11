const API_URL = 'http://localhost:5000/api';

export const userService = {
  async updateProfile(userId, userData) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async changePassword(userId, passwordData) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });
      if (!response.ok) throw new Error('Failed to change password');
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  async getOrders(userId) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async updateNotificationPreferences(userId, preferences) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error('Failed to update notification preferences');
      return await response.json();
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }
};

export default userService;
