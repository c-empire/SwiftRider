// const express = require('express');
// const { protect, authorize } = require('../middleware/auth'); // 👈 use protect + authorize
// const { makePayment } = require('../controllers/paymentController');

// const router = express.Router();

// // Only customers can make a payment
// router.post('/', protect, authorize('customer'), makePayment);

// module.exports = router;

const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { makePayment } = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment APIs for customers
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Make a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deliveryId
 *               - amount
 *             properties:
 *               deliveryId:
 *                 type: string
 *                 description: ID of the delivery being paid for
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               paymentMethod:
 *                 type: string
 *                 enum: [card, wallet, transfer]
 *                 description: Method of payment
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 transactionId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 deliveryId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a customer)
 */
router.post('/', protect, authorize('customer'), makePayment);

module.exports = router;


