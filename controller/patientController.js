const Patient = require('../models/patient'); // Use the correct model for patients

// Add a new patient
const postData = async (req, res) => {
    try {
        const patient = new Patient(req.body); // Use the Patient model
        await patient.save();
        res.status(201).json({ message: 'Patient added successfully', patient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all patients
const getData = async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients from the database
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get a patient by ID
const getByID = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id); // Find patient by ID
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient by ID:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update a patient by ID
const updateByID = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
    } catch (error) {
        console.error('Error updating patient:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete a patient by ID
const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postData, getData, getByID, updateByID, deleteData };
