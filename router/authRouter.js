const express = require('express');
const { registerUser, loginUser,uploadImage } = require('../controller/authController');
const upload = require("../middleware/uploads");

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

router.post("/uploadImage", upload, uploadImage);

module.exports = router;
