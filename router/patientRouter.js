const express = require('express');
const { getData, postData, getByID, updateByID, deleteData } = require('../controller/patientController');

const router = express.Router();

// Add a new patient
router.post('/add', postData);

// Get all patients
router.get('/get', getData);

// Get a patient by ID
router.get('/getById/:id', getByID);

// Update a patient by ID
router.put('/update/:id', updateByID);

// Delete a patient by ID
router.delete('/delete/:id', deleteData);

module.exports = router;
