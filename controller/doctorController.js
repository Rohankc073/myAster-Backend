const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const multer = require('multer');

// 📌 Configure Multer for Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

/** 
 * ✅ Create a new doctor
 * - Converts `availableDays` to actual Date values
 * - Converts `availableTimes` into objects (`start`, `end`)
 * - Handles image upload
 */
const createDoctor = async (req, res) => {
  try {
    const { name, specialization, contact, email } = req.body;
    const image = req.file ? req.file.path : null; // Handling image upload

    if (!name || !specialization || !contact || !email ) {
      return res.status(400).json({ error: "Missing required fields. Ensure all fields are provided." });
    }

    // Convert availableDays from strings to Date objects
    

    const newDoctor = new Doctor({
      name,
      specialization,
      
      contact,
      email,
      image,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", newDoctor });
  } catch (error) {
    res.status(400).json({ error: "Error creating doctor", details: error.message });
  }
};

/** 
 * ✅ Get all doctors
 * - Retrieves all doctors including their images, date, and time
 */
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    
    // ✅ Ensure the full image URL is included
    const updatedDoctors = doctors.map((doctor) => ({
      ...doctor._doc,
      image: doctor.image ? `http://localhost:5003/${doctor.image}` : null, // Full URL
    }));

    res.status(200).json(updatedDoctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors", details: error.message });
  }
};


/** 
 * ✅ Get doctor by ID
 * - Retrieves a single doctor's details
 */
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

/** 
 * ✅ Update doctor details
 * - Allows updating doctor details, including `date`, `time`, and `image`
 */
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.availableDays) {
      updates.availableDays = updates.availableDays.split(",").map(day => new Date(day.trim()));
    }

    if (updates.availableTimes) {
      updates.availableTimes = updates.availableTimes.split(",").map(time => {
        const [start, end] = time.trim().split("-");
        return { start: start.trim(), end: end.trim() };
      });
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
  } catch (error) {
    res.status(400).json({ error: 'Error updating doctor', details: error.message });
  }
};

/** 
 * ✅ Delete doctor
 * - Removes doctor record from the database
 */
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

/** 
 * ✅ Get all appointments for a specific doctor
 * - Fetches appointments assigned to a doctor
 */
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

/** 
 * ✅ Cancel a doctor's appointment
 * - Updates appointment status to 'cancelled'
 */
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