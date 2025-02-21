const Order = require('../models/orders');
const Cart = require('../models/cart');

// 📌 Place a new order
const placeOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;

    // ✅ Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'price');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: '❌ Cart is empty' });
    }

    // ✅ Calculate total price
    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    // ✅ Create new order with default status as "Pending"
    const order = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      total,
      shippingAddress,
      paymentMethod,
      status: "Pending", // Default status
      createdAt: new Date(), // Ensure timestamp
    });

    await order.save();

    // ✅ Clear the cart after placing the order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: '✅ Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: '❌ Error placing order', details: error.message });
  }
};

// 📌 Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("items.productId", "name price image");

    // ✅ Ensure each product image has a full URL
    const updatedOrders = orders.map((order) => ({
      ...order._doc,
      items: order.items.map((item) => ({
        ...item._doc,
        productId: {
          ...item.productId._doc,
          image: item.productId.image ? `http://localhost:5003/${item.productId.image}` : "https://via.placeholder.com/80",
        },
      })),
    }));

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error.message });
  }
};


// 📌 Get order details by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId)
      .populate('items.productId', 'name price')
      .populate('userId', 'name email'); // Include user details

    if (!order) {
      return res.status(404).json({ message: '❌ Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: '❌ Error fetching order details', details: error.message });
  }
};

// 📌 Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: '❌ Order not found' });
    }

    res.status(200).json({ message: '✅ Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: '❌ Error updating order status', details: error.message });
  }
};

// 📌 Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // ✅ Check if order already canceled
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: '❌ Order not found' });
    }
    if (order.status === "Cancelled") {
      return res.status(400).json({ message: '❌ Order is already canceled' });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: '✅ Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ error: '❌ Error cancelling order', details: error.message });
  }
};

// 📌 Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email') // Include user details
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 }); // Show latest orders first

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "❌ No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching all orders", details: error.message });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
