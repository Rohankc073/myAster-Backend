const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication middleware
const authentication = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided. Access denied!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Store user data in request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Authorization middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    };
};

module.exports = { authentication, authorizeRoles };
