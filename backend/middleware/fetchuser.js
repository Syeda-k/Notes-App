const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Use the JWT secret from your .env

const authenticateToken = (req, res, next) => {
  const token = req.header('auth-token'); // Token is expected in the 'auth-token' header

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded.user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = authenticateToken;
