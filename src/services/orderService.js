import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const createOrder = async (items, totalAmount, token) => {
  try {
    // Validate inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('No items in cart');
    }
    
    if (!token) {
      throw new Error('Authentication token is required');
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(API_URL, { items, totalAmount }, config);
    return data;
  } catch (error) {
    console.error('Order creation error:', error);
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw error.response?.data || error;
  }
};

const orderService = {
  createOrder,
};

export default orderService;
