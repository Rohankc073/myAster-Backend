const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controller/productController');
const upload = require('../config/uploads');

const router = express.Router();

// ✅ Add a new product with an image
router.post('/add', upload.single('image'), addProduct);

// ✅ Get all products (medicines)
router.get('/all', getProducts);

// ✅ Get product by ID
router.get('/:id', getProductById);

// ✅ Update a product
router.put('/update/:id', upload.single('image'), updateProduct);

// ✅ Delete a product
router.delete('/delete/:id', deleteProduct);

module.exports = router;
