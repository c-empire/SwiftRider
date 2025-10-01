const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    pickupLocation: { type: String, required: true },   // e.g., "Ikeja, Lagos"
    dropoffLocation: { type: String, required: true }, // e.g., "Victoria Island"

    packageDetails: { type: String, required: true },
    cost: { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'in-progress', 'completed'],
      default: 'pending',
    },

    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Rider live location (optional)
    currentLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },

    // Lifecycle timestamps
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('DeliveryRequest', deliverySchema);
