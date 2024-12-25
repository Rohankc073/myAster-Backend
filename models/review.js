const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who left the review
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to the product (optional)
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' }, // Reference to the doctor (optional)
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
    review: { type: String, required: true }, // User's review
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
