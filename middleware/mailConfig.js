

const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Email Address
        pass: process.env.EMAIL_PASS, // App Password
    },
});

// Verify the transporter
transporter.verify((error) => {
    if (error) {
        console.error("Error with SMTP transport:", error);
    } else {
        // console.log("SMTP transport is ready to send emails");
    }
});

module.exports = transporter;