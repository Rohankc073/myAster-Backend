const User = require('../models/user'); // Ensure this points to the correct User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Register a new user (Patient, Admin, or Doctor)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, age, gender, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword, // Save hashed password
            phone,
            age,
            gender,
            role: role || 'Patient', // Default role is 'Patient' if not provided
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user: { name, email, role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a user (Patient, Admin, or Doctor)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token with role and expiry time
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload: user ID and role
            process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: '2h' } // Token validity: 2 hours
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
