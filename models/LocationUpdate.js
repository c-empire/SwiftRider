const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryRequest', required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LocationUpdate', locationSchema);