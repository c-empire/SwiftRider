// controllers/adminController.js
const User = require('../models/User');
const Delivery = require('../models/Delivery');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const completed = await Delivery.countDocuments({ status: 'completed' });
    const revenue = await Delivery.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);

    res.json({
      completed,
      revenue: revenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
