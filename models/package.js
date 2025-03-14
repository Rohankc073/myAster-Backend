const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // Example: "3 Days", "1 Week"
    servicesIncluded: { type: [String], required: true }, // Array of services
    image: { type: String }, // Stores image path
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', PackageSchema);
