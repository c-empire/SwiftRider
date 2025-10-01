const express = require('express');
const jwt = require('jsonwebtoken');
const deliveryController = require('../controllers/deliveryController');

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

router.post('/', authMiddleware, deliveryController.createDelivery);
router.put('/:id/accept', authMiddleware, deliveryController.acceptDelivery);
router.put('/:id/status', authMiddleware, deliveryController.updateStatus);
router.post('/:id/pay', authMiddleware, deliveryController.makePayment);
router.put('/location', authMiddleware, deliveryController.updateLocation);
router.get('/location/:id', authMiddleware, deliveryController.getLocation);

module.exports = router;