// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/auth');
// const deliveryController = require('../controllers/deliveryController');

// // Customer can create delivery requests
// router.post('/', protect, authorize('customer'), deliveryController.createDelivery);

// // Any authenticated rider can view available deliveries
// router.get('/available', protect, authorize('rider'), deliveryController.getAvailableDeliveries);

// // Only a rider can accept a delivery
// router.post('/:id/accept', protect, authorize('rider'), deliveryController.acceptDelivery);

// // Only the assigned rider can update the status of a delivery
// router.patch('/:id/status', protect, authorize('rider'), deliveryController.updateStatus);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const deliveryController = require('../controllers/deliveryController');

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Delivery management APIs
 */

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Create a new delivery request
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickupLocation
 *               - dropoffLocation
 *             properties:
 *               pickupLocation:
 *                 type: string
 *               dropoffLocation:
 *                 type: string
 *               packageDetails:
 *                 type: string
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, authorize('customer'), deliveryController.createDelivery);

/**
 * @swagger
 * /api/deliveries/available:
 *   get:
 *     summary: Get all available deliveries
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   pickupLocation:
 *                     type: string
 *                   dropoffLocation:
 *                     type: string
 *                   status:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/available', protect, authorize('rider'), deliveryController.getAvailableDeliveries);

/**
 * @swagger
 * /api/deliveries/{id}/accept:
 *   post:
 *     summary: Accept a delivery
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery accepted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a rider)
 */
router.post('/:id/accept', protect, authorize('rider'), deliveryController.acceptDelivery);

/**
 * @swagger
 * /api/deliveries/{id}/status:
 *   patch:
 *     summary: Update delivery status (only assigned rider)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, in-progress, completed, cancelled]
 *     responses:
 *       200:
 *         description: Delivery status updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the assigned rider)
 */
router.patch('/:id/status', protect, authorize('rider'), deliveryController.updateStatus);

module.exports = router;


