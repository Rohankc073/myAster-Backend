const express = require('express');
const { registerPatient, loginPatient } = require('../controller/authController');

const router = express.Router();

// Register route
router.post('/register', registerPatient);

// Login route
router.post('/login', loginPatient);

module.exports = router;
