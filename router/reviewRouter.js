const express = require('express');
const {
  addReview,
  getProductReviews,
  getDoctorReviews,
  deleteReview,
} = require('../controller/reviewController');

const router = express.Router();

// Add a review
router.post('/add', addReview);

// Get all reviews for a product
router.get('/product/:productId', getProductReviews);

// Get all reviews for a doctor
router.get('/doctor/:doctorId', getDoctorReviews);

// Delete a review
router.delete('/:reviewId', deleteReview);

module.exports = router;
