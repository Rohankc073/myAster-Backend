const express = require('express');
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controller/cartController');

const router = express.Router();

// Add item to cart
router.post('/add', addToCart);

// Get cart items
router.get('/:userId', getCartItems);

// Update item quantity
router.put('/update', updateCartItem);

// Remove item from cart
router.delete('/remove', removeCartItem);

// Clear cart
router.delete('/clear/:userId', clearCart);

module.exports = router;
