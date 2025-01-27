const User = require('../models/user'); // Ensure this points to the correct User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Register a new user (Patient, Admin, or Doctor)
const registerUser = async (req, res) => {
    try {
        console.log("Received signup request:", req.body);

        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || "Patient",
        });

        await user.save();

        console.log("User registered successfully:", user);
        res.status(201).json({ message: "User registered successfully", user: { name, email, role } });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// Login a user (Patient, Admin, or Doctor)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log("Reached User::: ",user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).send({ message: "Invalid email or password" });
        }

        // // Compare the provided password with the stored hashed password
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }

        // Generate JWT token with role and expiry time
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Payload: user ID and role
            process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: '2h' } // Token validity: 2 hours
        );

    

        res.status(200).json({ message: 'Login successful', token ,user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
