const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
