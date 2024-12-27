const express = require('express');
const {
  bookService,
  getBookingsByPatient,
  getBookingById,
  cancelBooking,
} = require('../controller/service_bookingController');

const router = express.Router();

// Book a service
router.post('/add', bookService);

// Get all bookings for a patient
router.get('/patient/:patientId', getBookingsByPatient);

// Get a booking by ID
router.get('/:id', getBookingById);

// Cancel a booking
router.put('/cancel/:id', cancelBooking);

module.exports = router;
