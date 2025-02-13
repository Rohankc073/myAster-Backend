const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Product name
    genericName: { type: String },           // Generic name of medicine
    manufacturer: { type: String },          // Manufacturer
    price: { type: Number, required: true }, // Price of medicine
    quantity: { type: Number, required: true }, // Quantity available
    dosage: { type: String },                // Dosage instructions
    requiresPrescription: { type: Boolean, default: false }, // Prescription required?
    category: { type: String },              // Medicine category
    image: { type: String, default: null },  // Image URL or path
    description: { type: String },           // Medicine description
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
