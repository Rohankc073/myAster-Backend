const Patient = require('../models/patient');

const postData = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: 'Data Saved', patient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getData = async (req,res) =>{
    try {
        const patients = await Patient.find(); // Fetch all patients from the database
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID parameter is required." });
        }

        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(patient);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID format." });
        }
        console.error("Server Error:", error.message);
        res.status(500).json({ message: "Something went wrong on our end. Please try again later." });
    }
};


module.exports = {postData,getData,getById};