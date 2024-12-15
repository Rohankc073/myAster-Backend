// controllers/patientController.js
const User = require('../models/user');

const postData = async (req, res) => {
    try {
        const patient = new User(req.body);
        await patient.save();
        res.status(201).json({ message: 'Data Saved', patient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getData = async (req, res) => {
    try {
        const patients = await User.find(); // Fetch all patients from the database
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {postData,getData};
