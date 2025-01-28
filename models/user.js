const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Doctor", "Patient"], default: "Patient" }, // Role field
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
