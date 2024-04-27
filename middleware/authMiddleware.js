// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    console.log("Token Value:");
    console.log(token);
    // Check if token exists
    if (token) {
        // Verify JWT token
        jwt.verify(token, 'key123', async (err, decodedToken) => {
            if (err) {
                console.error('Error verifying token:', err);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                // Token is valid
                const user = await User.findById(decodedToken.userId);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    // Attach user object to request
                    req.user = user;
                    next();
                }
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized: Middleware Error' });
    }
};

module.exports = { requireAuth };
