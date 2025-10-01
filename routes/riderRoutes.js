// const express = require('express');
// const { protect, authorize } = require('../middleware/auth');

// const router = express.Router();

// // Temporary in-memory store for rider locations
// let riderLocations = {};

// /**
//  * PATCH /api/riders/location
//  * Rider updates their own location
//  */
// router.patch('/location', protect, authorize('rider'), (req, res) => {
//   const { lat, lng } = req.body;
//   if (typeof lat !== 'number' || typeof lng !== 'number') {
//     return res.status(400).json({ msg: 'Invalid coordinates' });
//   }

//   riderLocations[req.user._id] = { lat, lng, updatedAt: new Date() };
//   res.json({ msg: 'Location updated', location: riderLocations[req.user._id] });
// });

// /**
//  * GET /api/riders/:riderId/location
//  * Customer/Admin fetches one rider’s location
//  */
// router.get('/:riderId/location', protect, authorize('customer', 'admin'), (req, res) => {
//   try {
//     const location = riderLocations[req.params.riderId];
//     if (!location) return res.status(404).json({ msg: 'Rider location not found' });

//     res.json({ riderId: req.params.riderId, location });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// /**
//  * GET /api/riders/locations
//  * Admin fetches all rider locations
//  */
// router.get('/locations/all', protect, authorize('admin'), (req, res) => {
//   try {
//     res.json(riderLocations);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Temporary in-memory store for rider locations
let riderLocations = {};

/**
 * @swagger
 * tags:
 *   name: Riders
 *   description: Rider location management APIs
 */

/**
 * @swagger
 * /api/riders/location:
 *   patch:
 *     summary: Update rider location
 *     tags: [Riders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *             properties:
 *               lat:
 *                 type: number
 *                 description: Latitude of the rider
 *               lng:
 *                 type: number
 *                 description: Longitude of the rider
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid coordinates
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a rider)
 */
router.patch('/location', protect, authorize('rider'), (req, res) => {
  const { lat, lng } = req.body;
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ msg: 'Invalid coordinates' });
  }

  riderLocations[req.user._id] = { lat, lng, updatedAt: new Date() };
  res.json({ msg: 'Location updated', location: riderLocations[req.user._id] });
});

/**
 * @swagger
 * /api/riders/{riderId}/location:
 *   get:
 *     summary: Get a rider's current location
 *     tags: [Riders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: riderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the rider
 *     responses:
 *       200:
 *         description: Rider location found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 riderId:
 *                   type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Rider location not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (must be customer or admin)
 */
router.get('/:riderId/location', protect, authorize('customer', 'admin'), (req, res) => {
  try {
    const location = riderLocations[req.params.riderId];
    if (!location) return res.status(404).json({ msg: 'Rider location not found' });

    res.json({ riderId: req.params.riderId, location });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

/**
 * @swagger
 * /api/riders/locations/all:
 *   get:
 *     summary: Get all riders' locations (Admin only)
 *     tags: [Riders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all rider locations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/locations/all', protect, authorize('admin'), (req, res) => {
  try {
    res.json(riderLocations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
