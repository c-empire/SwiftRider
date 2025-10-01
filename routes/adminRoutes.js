// const express = require('express');
// const { protect, authorize } = require('../middleware/auth'); 
// const { getAllUsers, getAllDeliveries, getAnalytics } = require('../controllers/adminController');

// const router = express.Router();

// // Only admins can access these routes
// router.get('/users', protect, authorize('admin'), getAllUsers);
// router.get('/deliveries', protect, authorize('admin'), getAllDeliveries);
// router.get('/analytics', protect, authorize('admin'), getAnalytics);

// module.exports = router;

const express = require('express');
const { protect, authorize } = require('../middleware/auth'); 
const { getAllUsers, getAllDeliveries, getAnalytics } = require('../controllers/adminController');

const router = express.Router();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/users', protect, authorize('admin'), getAllUsers);

/**
 * @swagger
 * /api/admin/deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/deliveries', protect, authorize('admin'), getAllDeliveries);

/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get analytics data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalDeliveries:
 *                   type: number
 *                 revenue:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/analytics', protect, authorize('admin'), getAnalytics);

module.exports = router;
