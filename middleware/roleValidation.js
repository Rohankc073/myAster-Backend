const jwt = require('jsonwebtoken');

// Authentication middleware
const authentication = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the decoded token to req.user
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    };
};
  

module
    .exports = { authentication, authorizeRoles  }