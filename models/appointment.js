const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to Patient model
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  userName: { type: String }, // Will be fetched dynamically
  doctorName: { type: String }, // Will be fetched dynamically
  age: { type: Number, required: true }, 
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, 
  problemDescription: { type: String, required: true }, 
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
