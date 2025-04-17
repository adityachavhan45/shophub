const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in cart'
      });
    }

    // Debug logging
    console.log('Received items:', JSON.stringify(items));
    console.log('User from token:', JSON.stringify(req.user));
    
    // Get user ID from the JWT token structure
    const userId = req.user.user.id;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    // Create order with properly formatted data
    const order = new Order({
      user: userId, // Set user ID from token
      items: items.map(item => ({
        product: item.productId, // Store product ID as is, without ObjectId validation
        productName: item.name, // Store additional product info for reference
        productImage: item.image,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      status: 'completed', // Since we're not implementing actual payment
      paymentStatus: 'completed'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order: ' + error.message
    });
  }
});

module.exports = router;
