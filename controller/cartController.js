const Cart = require('../models/cart');

// Add an item to the cart
const addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ userId });
       
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({
          userId,
          items: [{ productId, quantity }],
        });
      } else {
        // If a cart exists, update it (add item or update quantity)
        const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  
        if (productIndex > -1) {
          // Update quantity if the product already exists in the cart
          cart.items[productIndex].quantity += quantity;
        } else {
          // Add new product to the cart
          cart.items.push({ productId, quantity });
        }
      }
  
      // Save the cart (new or updated)
      await cart.save();
      res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
      res.status(500).json({ error: 'Error adding to cart', details: error.message });
    }
  };
  

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items', details: error.message });
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (productIndex > -1) {
      cart.items[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: 'Cart updated', cart });
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart', details: error.message });
  }
};

// Remove an item from the cart
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart', details: error.message });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart', details: error.message });
  }
};

module.exports = { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart };
