const express = require('express');
const { postData, getData, getByID, updateByID, deleteData } = require('../controller/userController');

const router = express.Router();

// Add a new patient
router.post('/add', postData);

// Get all patients
router.get('/all', getData);

// Get a patient by ID
router.get('/:id', getByID);

// Update a patient by ID
router.put('/update/:id', updateByID);

// Delete a patient by ID
router.delete('/:id', deleteData);

module.exports = router;
