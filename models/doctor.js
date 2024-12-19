const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  availableDays: {
    type: [String], // Example: ['Monday', 'Wednesday', 'Friday']
    required: true,
  },
  availableTimes: {
    type: [String], // Example: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM']
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate contacts for doctors
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails for doctors
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
