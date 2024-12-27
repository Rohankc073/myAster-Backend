const ServiceBooking = require('../models/service_booking');
const Service = require('../models/service_booking');

// Book a service
const bookService = async (req, res) => {
  try {
    const { patientId, serviceId, date } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = new ServiceBooking({
      patientId,
      serviceId,
      date,
      status: 'Scheduled',
    });

    await booking.save();
    res.status(201).json({ message: 'Service booked successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Error booking service', details: error.message });
  }
};

// Get all bookings for a patient
const getBookingsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const bookings = await ServiceBooking.find({ patientId }).populate('serviceId', 'name price category');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings', details: error.message });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await ServiceBooking.findById(id).populate('serviceId', 'name price category');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching booking', details: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await ServiceBooking.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling booking', details: error.message });
  }
};

module.exports = { bookService, getBookingsByPatient, getBookingById, cancelBooking };
