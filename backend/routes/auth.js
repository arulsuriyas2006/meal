const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    try {
    const { name, email, password } = req.body;
    console.log("Received signup data:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: 'Error creating user', details: err });
  }
});


router.post('/login', async (req, res) => {
  try {
    console.log("Login Request Body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

   res.status(200).json({
    message: 'Login successful',
    email: user.email
  });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// routes/favorite.js


module.exports = router;
