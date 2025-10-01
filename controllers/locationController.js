const LocationUpdate = require('../models/LocationUpdate');
const DeliveryRequest = require('../models/DeliveryRequest');

exports.updateLocation = async (req, res) => {
  const { deliveryId, lat, lng } = req.body;
  try {
    const delivery = await DeliveryRequest.findById(deliveryId);
    if (!delivery || delivery.rider.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'Invalid delivery' });

    const update = new LocationUpdate({
      delivery: deliveryId,
      rider: req.user._id,
      location: { lat, lng },
    });
    await update.save();
    res.json(update);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const updates = await LocationUpdate.find({ delivery: req.params.deliveryId }).sort({ timestamp: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};