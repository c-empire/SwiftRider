const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickup: { address: String, location: { lat: Number, lng: Number } },
  dropoff: { address: String, location: { lat: Number, lng: Number } },
  packageDetails: String,
  cost: Number,
  status: { type: String, enum: ['pending', 'accepted', 'in-progress', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);