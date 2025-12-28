const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const bookTicket = async (req, res) => {
  try {
    const {
      flightId,
      flightName,
      origin,
      destination,
      departureTime,
      arrivalTime,
      date,
      seatClass,
      passengers,
      totalAmount
    } = req.body;

    // Find the flight by flightId
    const flight = await Flight.findOne({ flightId });
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Get existing bookings for this flight
    const existingBookings = await Booking.find({
      flightId,
      date,
      seatClass: seatClass || 'economy',
      status: 'confirmed'
    });

    // Calculate already booked seats
    let bookedSeats = 0;
    existingBookings.forEach(booking => {
      bookedSeats += booking.passengers.length;
    });

    // Check if seats are available
    if (bookedSeats + passengers.length > flight.totalSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Assign seat numbers
    const passengersWithSeats = passengers.map((passenger, index) => {
      let seatNumber;
      const seatIndex = bookedSeats + index + 1;
      
      switch (seatClass || 'economy') {
        case 'economy':
          seatNumber = `E${seatIndex}`;
          break;
        case 'business':
          seatNumber = `B${seatIndex}`;
          break;
        case 'first':
          seatNumber = `F${seatIndex}`;
          break;
        default:
          seatNumber = `${seatIndex}`;
      }

      return {
        ...passenger,
        seatNumber
      };
    });

    // Create new booking
    const newBooking = new Booking({
      userId: req.user.id,
      userEmail: req.user.email,
      flight: flight._id,
      flightId,
      flightName: flightName || flight.name,
      origin: origin || flight.origin,
      destination: destination || flight.destination,
      departureTime: departureTime || flight.departureTime,
      arrivalTime: arrivalTime || flight.arrivalTime,
      date: date || flight.date,
      seatClass: seatClass || 'economy',
      seats: passengers.length,
      passengers: passengersWithSeats,
      totalAmount: totalAmount || (flight.price * passengers.length)
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId !== req.user.id && req.user.usertype !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchBookings = async (req, res) => {
  try {
    let bookings;
    
    // If user is authenticated and not admin, show only their bookings
    if (req.user && req.user.usertype !== 'admin') {
      bookings = await Booking.find({ userId: req.user.id }).populate('flight');
    } else {
      // Admin or unauthenticated request - show all bookings
      bookings = await Booking.find().populate('flight');
    }
    
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookTicket, cancelTicket, fetchBookings };