const Appointment = require('../models/appointment');

// Schedule a new appointment
const scheduleAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment scheduled successfully', newAppointment });
  } catch (error) {
    res.status(400).json({ error: 'Error scheduling appointment', details: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate('patientId', 'name age contact') // Populating patient fields
        .populate('doctorId', 'name specialization'); // Populating doctor fields
  
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching appointments', details: error.message });
    }
  };

// Get appointments by ID
const getAppointmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id)
        .populate('patientId', 'name age contact address')
        .populate('doctorId', 'name specialization');
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching appointment', details: error.message });
    }
  };
  

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment cancelled successfully', updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling appointment', details: error.message });
  }
};

module.exports = {
  scheduleAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
};
