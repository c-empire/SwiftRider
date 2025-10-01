const express = require('express');
const jwt = require('jsonwebtoken');
const adminController = require('../controllers/adminController');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

router.get('/users', authMiddleware, adminController.getUsers);
router.get('/deliveries', authMiddleware, adminController.getDeliveries);
router.get('/analytics', authMiddleware, adminController.getAnalytics);

module.exports = router;