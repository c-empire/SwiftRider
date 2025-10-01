const User = require('../models/User');

// Update rider's current location
exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    if (!lat || !lng) {
      return res.status(400).json({ msg: "Latitude and Longitude are required" });
    }

    const rider = await User.findById(req.user._id);
    if (!rider || rider.role !== 'rider') {
      return res.status(403).json({ msg: "Access denied" });
    }

    rider.location = { lat, lng };
    await rider.save();

    res.json({ msg: "Location updated successfully", location: rider.location });
  } catch (err) {
    console.error("❌ Rider location update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get rider location (by rider ID)
exports.getLocation = async (req, res) => {
  try {
    const rider = await User.findById(req.params.id).select('location role');
    if (!rider || rider.role !== 'rider') {
      return res.status(404).json({ msg: "Rider not found" });
    }
    res.json({ riderId: rider._id, location: rider.location });
  } catch (err) {
    console.error("❌ Get rider location error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
