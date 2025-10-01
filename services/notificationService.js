// Mock notification service
exports.sendNotification = (userId, message) => {
  console.log(`Notification to user ${userId}: ${message}`);
  // Extend to real email/SMS here
};