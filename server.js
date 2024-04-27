const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();

//To Process Json file
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

// Define a route
app.get('/', (req, res) => {
    res.send('Authentication API Assignment-1 Project'); 
});

// Routes
app.use('/user', authRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
