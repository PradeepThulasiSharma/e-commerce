// middleware/auth.js
const jwt = require('jsonwebtoken');

// You should keep your secret in an environment variable in real apps
const JWT_SECRET = 'my_super_secret_key';

exports.generateToken = (user) => {
  return jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
