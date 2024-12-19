const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const { name, specialization, availableDays, availableTimes, contact, email } = req.body;

    const newDoctor = new Doctor({
      name,
      specialization,
      availableDays,
      availableTimes,
      contact,
      email,
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor created successfully', newDoctor });
  } catch (error) {
    res.status(400).json({ error: 'Error creating doctor', details: error.message });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctors', details: error.message });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctor', details: error.message });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
  } catch (error) {
    res.status(400).json({ error: 'Error updating doctor', details: error.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully', deletedDoctor });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting doctor', details: error.message });
  }
};

// Get all appointments for a specific doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name age contact')
      .sort({ date: 1, time: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctor appointments', details: error.message });
  }
};

// Cancel an appointment for a doctor
const cancelDoctorAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
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
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
  cancelDoctorAppointment,
};
