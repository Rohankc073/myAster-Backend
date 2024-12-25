const Review = require('../models/review');

// Add a review
const addReview = async (req, res) => {
  try {
    const { userId, productId, doctorId, rating, review } = req.body;

    if (!productId && !doctorId) {
      return res.status(400).json({ error: 'Either productId or doctorId is required' });
    }

    const newReview = new Review({
      userId,
      productId,
      doctorId,
      rating,
      review,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review', details: error.message });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate('userId', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product reviews', details: error.message });
  }
};

// Get all reviews for a doctor
const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctorId }).populate('userId', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctor reviews', details: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review', details: error.message });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  getDoctorReviews,
  deleteReview,
};
