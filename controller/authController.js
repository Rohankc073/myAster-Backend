const User = require('../models/user'); // Ensure this points to the correct User model
const Cart = require('../models/cart'); // Import Cart model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const WelcomeEmail = require('../templets/WelcomeEmail');

const transporter = require('../middleware/mailConfig');
// ✅ Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "2h" }
    );
};

// ✅ Register a new user (Patient, Admin, or Doctor)
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

        // ✅ Create an empty cart for the new user
        await Cart.create({ userId: user._id, items: [] });

        const token = generateToken(user);

        // Send registration email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Registration Successful. Welcome!",
            html: WelcomeEmail({ name: user.name }),
        };
        await transporter.sendMail(mailOptions);

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

// ✅ Login a user (Patient, Admin, or Doctor)
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

        // ✅ Fetch user's cart during login
        const cart = await Cart.findOne({ userId: user._id });

        // ✅ Log the response to debug issues
        console.log("✅ Login Response:", {
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id, // ✅ Ensure _id is included
                name: user.name,
                email: user.email,
                role: user.role
            },
            cart: cart || { userId: user._id, items: [] } // Return cart or empty cart
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id, // ✅ Ensure _id is included
                name: user.name,
                email: user.email,
                role: user.role
            },
            cart: cart || { userId: user._id, items: [] } // Return cart or empty cart
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// ✅ Upload Image (Consistent style with loginUser)
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
