const express = require('express');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
  cancelDoctorAppointment,
} = require('../controller/doctorController');

const router = express.Router();

// CRUD operations for doctors
router.post('/save', createDoctor); // Create a doctor
router.get('/getAll', getAllDoctors); // Get all doctors
router.get('/:id', getDoctorById); // Get a doctor by ID
router.put('/:id', updateDoctor); // Update a doctor
router.delete('/:id', deleteDoctor); // Delete a doctor

// Appointment management for doctors
router.get('/:doctorId/appointments', getDoctorAppointments); // Get all appointments for a doctor
router.put('/appointments/:appointmentId/cancel', cancelDoctorAppointment); // Cancel a specific appointment for a doctor

module.exports = router;


// 67638648bdc9a72f3e34247c

// 674dc9ea8211e0f36e4576cb Pa