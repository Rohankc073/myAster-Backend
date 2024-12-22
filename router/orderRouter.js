const express = require('express');
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require('../controller/ordersController');

const router = express.Router();

// Place a new order
router.post('/add', placeOrder);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

// Get order details by ID
router.get('/:orderId', getOrderById);

// Update order status (admin)
router.put('/status/:orderId', updateOrderStatus);

// Cancel an order
router.put('/cancel/:orderId', cancelOrder);

module.exports = router;
