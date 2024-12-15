 const express = require('express');
const { addProduct, getProducts } = require('../controller/productController');
const upload = require('../config/uploads');

const router = express.Router();

router.post('/add', upload.single('image'), addProduct);

// Get all products
router.get('/all', getProducts);
module.exports = router;
