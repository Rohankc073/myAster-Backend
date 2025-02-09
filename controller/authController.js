const User = require('../models/user'); // Ensure this points to the correct User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "2h" }
    );
};

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
            return res.status(400).json({ message: "Email already registered" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || "Patient",
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login a user (Patient, Admin, or Doctor)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Upload Image (Consistent style with loginUser)
const uploadImage = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        // Return the filename of the uploaded image
        res.status(200).json({
            success: true,
            data: req.file.filename, // Filename of the uploaded image
        });
    } catch (error) {
        console.error("Image upload error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser, uploadImage };
