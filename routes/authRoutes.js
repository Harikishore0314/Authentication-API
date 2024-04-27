// -> Login: /login - done
// email:
// password:

// -> Signup: /signup 
// email:
// password:
// usernamename:

// -> User Details: /user-details
// - Returns Details of all users

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { requireAuth } = require('../middleware/authMiddleware');


// Login route
router.post('/login', requireAuth, async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;


        // Check if user exists
        const user = await User.findOne({ email });

        console.log("this is user data:");
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(201).json({ user });
        
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email }); 

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'key123', { expiresIn: '100y' });

        res.status(200).json({ token });

    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/user-details', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


module.exports = router;
