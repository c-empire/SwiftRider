// Mock payment service (simulate Stripe/Paystack)
exports.processPayment = async (payment) => {
  // Simulate success/failure
  const success = Math.random() > 0.1; // 90% success rate
  return {
    status: success ? 'paid' : 'failed',
    transactionId: `mock_tx_${Date.now()}`,
  };
};