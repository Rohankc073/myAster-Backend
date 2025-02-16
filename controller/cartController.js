const Cart = require("../models/cart");
const Product = require("../models/products");

// ✅ Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity,
          },
        ],
      });
    } else {
      const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity,
        });
      }
    }

    await cart.save();
    res.status(201).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get user cart
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update item quantity in cart
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (productIndex > -1) {
      cart.items[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ success: true, message: "Cart updated", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Remove an item from the cart
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Clear user cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart };
