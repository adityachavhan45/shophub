// Mock database structure
const initialData = {
  users: [],
  products: [],
  orders: [],
  cart: []
};

// Initialize local storage with structure if not exists
const initializeStorage = () => {
  if (!localStorage.getItem('ecommerce_db')) {
    localStorage.setItem('ecommerce_db', JSON.stringify(initialData));
  }
};

// Get data from storage
const getStorageData = () => {
  const data = localStorage.getItem('ecommerce_db');
  return JSON.parse(data);
};

// Save data to storage
const saveStorageData = (data) => {
  localStorage.setItem('ecommerce_db', JSON.stringify(data));
};

// User related operations
export const userService = {
  // Register new user
  register: (userData) => {
    const data = getStorageData();
    const existingUser = data.users.find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    saveStorageData(data);
    return newUser;
  },

  // Login user
  login: (email, password) => {
    const data = getStorageData();
    const user = data.users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Get user by ID
  getUserById: (userId) => {
    const data = getStorageData();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Update user profile
  updateProfile: (userId, updates) => {
    const data = getStorageData();
    const userIndex = data.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    data.users[userIndex] = {
      ...data.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveStorageData(data);
    const { password: _, ...userWithoutPassword } = data.users[userIndex];
    return userWithoutPassword;
  }
};

// Order related operations
export const orderService = {
  // Create new order
  createOrder: (userId, orderData) => {
    const data = getStorageData();
    const newOrder = {
      id: Date.now(),
      userId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    data.orders.push(newOrder);
    saveStorageData(data);
    return newOrder;
  },

  // Get user orders
  getUserOrders: (userId) => {
    const data = getStorageData();
    return data.orders.filter(order => order.userId === userId);
  }
};

// Cart related operations
export const cartService = {
  // Get user cart
  getCart: (userId) => {
    try {
      const data = getStorageData();
      const userCart = data.cart.find(cart => cart.userId === userId);
      if (!userCart) {
        const newCart = { userId, items: [] };
        data.cart.push(newCart);
        saveStorageData(data);
        return newCart;
      }
      return userCart;
    } catch (error) {
      console.error('Error getting cart:', error);
      return { userId, items: [] };
    }
  },

  // Update cart
  updateCart: (userId, items) => {
    try {
      const data = getStorageData();
      const cartIndex = data.cart.findIndex(cart => cart.userId === userId);
      
      if (cartIndex === -1) {
        data.cart.push({ userId, items });
      } else {
        data.cart[cartIndex].items = items;
      }

      saveStorageData(data);
      return items;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw new Error('Failed to update cart');
    }
  }
};

// Initialize storage when importing this module
initializeStorage();
