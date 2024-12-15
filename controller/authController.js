const Patient = require('../models/user');
const jwt = require('jsonwebtoken');
//Register and login logic 
// Register a new patient
const registerPatient = async (req, res) => {
    try {
        const { name, email, password, phone, age, gender } = req.body;

        // Check if patient already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new patient
        const patient = new Patient({ name, email, password, phone, age, gender });
        await patient.save();

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a patient
const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if patient exists
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isPasswordValid = await patient.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: patient._id }, 'your_jwt_secret', { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerPatient, loginPatient };
