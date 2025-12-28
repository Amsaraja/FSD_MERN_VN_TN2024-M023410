const express = require('express');
const { addFlight, updateFlight, updateFlightStatus, fetchFlight, fetchFlightById } = require('../controllers/flightController');
const { fetchBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', fetchFlight);
router.post('/add-flight', authMiddleware, addFlight);
router.put('/update-flight', authMiddleware, updateFlight);
router.put('/:id/status', authMiddleware, updateFlightStatus);
router.get('/fetch-flights', fetchFlight);
router.get('/fetch-flight/:id', fetchFlightById);
router.get('/fetch-bookings', fetchBookings);

module.exports = router;