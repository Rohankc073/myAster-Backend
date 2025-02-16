const express = require("express");
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controller/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCartItems);
router.put("/update", updateCartItem);
router.delete("/remove", removeCartItem);
router.delete("/clear/:userId", clearCart);

module.exports = router;
