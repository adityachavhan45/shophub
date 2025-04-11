const API_URL = 'http://localhost:5000/api';

export const cartService = {
  async getCart(userId) {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  async updateCart(userId, items) {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) throw new Error('Failed to update cart');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  async clearCart(userId) {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default cartService;
