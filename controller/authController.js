const User = require('../models/user'); // Ensure this points to the correct User model
const Cart = require('../models/cart'); // Import Cart model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require("dotenv").config();
const ResetPasswordEmail = require('../templets/ResetPasswordEmail')
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
            user: { 
                id: user._id,  // ✅ Ensure ID is included
                name: user.name, 
                email: user.email, 
                role: user.role 
            }
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
                userId: user._id, // ✅ Ensure _id is included
                username: user.name,
                email: user.email,
                role: user.role
            },
            // cart: cart || { userId: user._id, items: [] } // Return cart or empty cart
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


// Request Password Reset - Generate a Reset Token and send via email
const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Create a reset token (expires in 1 hour)
        const resetToken = jwt.sign(
            { user_id: user._id },
            process.env.SECRET_KEY, // ✅ Fix: Use process.env.SECRET_KEY
            { expiresIn: process.env.RESET_TOKEN_EXPIRY }
        );

        // Construct reset link
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        // In your email sending logic
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: ResetPasswordEmail({ email: user.email, resetLink }),
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error in sending reset email", error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        console.log("🔹 Received Token for Reset:", token);  // Debugging Step

        // ✅ Verify the reset token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            console.error("❌ Token Verification Error:", error.message);
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        console.log("🔹 Decoded Token:", decoded);

        // ✅ Find the user associated with the token
        const user = await User.findById(decoded.user_id);
        if (!user) {
            console.error("❌ User Not Found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("🔹 User Found:", user.email);

        // ✅ Ensure new password is provided
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // ✅ Set new password (Mongoose will trigger the pre("save") middleware)
        user.password = newPassword; 
        user.markModified("password");  // 🔥 Ensure Mongoose detects the change
        await user.save(); // ✅ Triggers pre("save") middleware automatically

        console.log("✅ Password Updated Successfully in Database!");

        return res.status(200).json({ message: "Password reset successfully. You can now log in with your new password." });
    } catch (error) {
        console.error("❌ Error resetting password:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { registerUser, loginUser, uploadImage,resetPasswordRequest ,resetPassword};
