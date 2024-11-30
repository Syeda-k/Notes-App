// index.js
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const connectToMongo = require('./db');  // MongoDB connection file
const jwt = require('jsonwebtoken');  // JWT library
const app = express();
const port = process.env.PORT || 5000;  // Use PORT from .env or default to 5000

// Connect to MongoDB
connectToMongo();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));  // Auth routes
app.use('/api/notes', require('./routes/notes'));  // Notes routes (if applicable)

// Authentication middleware
app.get('/api/auth/user', authenticateToken, (req, res) => {
  console.log('Request received at /api/auth/user');
  res.json({ message: 'Success', user: req.user });
});

// Authentication middleware function
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  // Verify JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }
    req.user = user;  // Add user data to request
    next();
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
