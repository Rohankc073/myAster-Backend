const express = require('express');
const {
  scheduleAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
} = require('../controller/appointmentController');

const router = express.Router();

// Schedule a new appointment
router.post('/schedule', scheduleAppointment);

// Get all appointments
router.get('/getAll', getAllAppointments);

// Get an appointment by ID
router.get('/:id', getAppointmentById);

// Cancel an appointment
router.put('/cancel/:id', cancelAppointment);

module.exports = router;
