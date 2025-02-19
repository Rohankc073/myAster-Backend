const Appointment = require("../models/appointment");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const transporter = require("../middleware/mailConfig"); // ✅ Use Existing Email Middleware
const AppointmentEmail = require("../templets/AppointmentEmail"); // ✅ New Email Template

const scheduleAppointment = async (req, res) => {
  try {
    const { userId, doctorId, age, gender, problemDescription, date, time } = req.body;

    if (!userId || !doctorId || !age || !gender || !problemDescription || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Fetch patient and doctor details
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Patient not found" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // ✅ Create and save the appointment
    const newAppointment = new Appointment({
      userId: user._id,
      doctorId: doctor._id,
      patientName: user.name,
      doctorName: doctor.name,
      age,
      gender,
      problemDescription,
      date,
      time,
    });

    await newAppointment.save();

    // ✅ Send Confirmation Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Appointment Confirmation - myAster Health",
      html: AppointmentEmail({
        userName: user.name,
        doctorName: doctor.name,
        date,
        time,
      }),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Appointment scheduled successfully", newAppointment });

  } catch (error) {
    console.error("Error scheduling appointment:", error.message);
    res.status(400).json({ error: "Error scheduling appointment", details: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name age gender') // Fetch patient details
      .populate('doctorId', 'name specialization'); // Fetch doctor details

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
      .populate('userId', 'name age gender')
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
