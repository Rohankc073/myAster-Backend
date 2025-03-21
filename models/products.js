const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genericName: { type: String },
    manufacturer: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    dosage: { type: String },
    requiresPrescription: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },  // ✅ Reference Category model
    image: { type: String, default: null },
    description: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
