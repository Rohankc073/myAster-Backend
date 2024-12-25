const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, // Service name (e.g., X-Ray, Blood Test)
      description: { type: String }, // Details about the service
      price: { type: Number, required: true }, // Cost of the service
      category: { type: String, enum: ['Lab Test', 'Radiology', 'Therapy'], required: true }, // Service category
    },
    { timestamps: true }
  );
  
  const Service = mongoose.model('Service', ServiceSchema);
  module.exports = Service;
  