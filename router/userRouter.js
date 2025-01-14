const express = require('express');
const { 
    postData, 
    getData, 
    getByID, 
    updateByID, 
    deleteData 
} = require('../controller/userController');

const { authentication, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Add a new patient (accessible by Admin only)

router.post('/add', authentication, authorizeRoles('Admin'), postData);


// Get all patients (accessible by Admin only)
router.get('/all', authentication, authorizeRoles('Admin'), getData);

// Get a patient by ID (accessible by Admin and Doctor)
router.get('/:id', authentication, authorizeRoles('Admin', 'Doctor'), getByID);

// Update a patient by ID (accessible by Admin and Patient)
router.put('/update/:id', authentication, authorizeRoles('Admin', 'Patient'), updateByID);

// Delete a patient by ID (accessible by Admin only)
router.delete('/:id', authentication, authorizeRoles('Admin'), deleteData);

module.exports = router;
