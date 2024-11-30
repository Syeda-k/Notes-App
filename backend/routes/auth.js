const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Replace with your actual User model

const router = express.Router();

// JWT Secret and Expiration (you must define `JWT_SECRET` in your environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use a strong key in production
const TOKEN_EXPIRATION = '1h'; // Token expiration time

// POST request for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST request for user signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user data from token payload
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// Example protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});

module.exports = router;
