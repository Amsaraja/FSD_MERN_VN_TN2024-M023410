const express = require('express');
const { bookTicket, cancelTicket, fetchBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book-ticket', authMiddleware, bookTicket);
router.put('/cancel-ticket/:id', authMiddleware, cancelTicket);
router.get('/all', fetchBookings);
router.get('/', authMiddleware, fetchBookings);

module.exports = router;