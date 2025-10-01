const Delivery = require('../models/Delivery');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware to check role (not used here, but you already have protect/authorize)
const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
  next();
};

// Customer creates a delivery request
exports.createDelivery = async (req, res) => {
  try {
    const delivery = new Delivery({ ...req.body, customer: req.user.userId });
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider views all pending deliveries
exports.getAvailableDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ status: 'pending' });
    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider accepts a delivery
exports.acceptDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid delivery' });
    }
    delivery.rider = req.user.userId;
    delivery.status = 'accepted';
    await delivery.save();
    console.log('Notification: Delivery accepted');
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider updates delivery status
exports.updateStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.rider.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    delivery.status = req.body.status;
    await delivery.save();
    console.log(`Notification: Delivery ${req.body.status}`);
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Customer makes payment
exports.makePayment = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery || delivery.customer.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: delivery.cost * 100,
      currency: 'usd',
    });
    delivery.paymentStatus = 'paid';
    await delivery.save();
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider updates location
exports.updateLocation = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.location = req.body.location;
    await user.save();
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get rider location
exports.getLocation = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
