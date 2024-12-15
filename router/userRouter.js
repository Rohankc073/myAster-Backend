// routes/patientRoutes.js
const express = require('express');
const { addProduct } = require('../controller/productController');
const { postData, getData } = require('../controller/userController');
const router = express.Router();
const upload = require('../config/uploads');
// Define the route to post patient data
router.post('/save', postData);
router.get('/get', getData);
router.post('/add', upload.single('image'), addProduct);
module.exports = router;
