const Payment = require('../models/Payment');
const DeliveryRequest = require('../models/DeliveryRequest');
const paymentService = require('../services/paymentService');

exports.makePayment = async (req, res) => {
  const { deliveryId, amount } = req.body;
  try {
    const delivery = await DeliveryRequest.findById(deliveryId);
    if (!delivery || delivery.customer.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'Invalid delivery' });

    const payment = new Payment({ delivery: deliveryId, amount });
    const result = await paymentService.processPayment(payment); // Mock
    payment.status = result.status;
    payment.transactionId = result.transactionId;
    await payment.save();

    res.json(payment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};