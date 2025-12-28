const Flight = require('../models/Flight');

const addFlight = async (req, res) => {
  try {
    console.log('Add flight request body:', req.body);
    const { name, flightId, origin, destination, date, departureTime, arrivalTime, price, totalSeats } = req.body;

    const newFlight = new Flight({
      name,
      flightId,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
      price,
      totalSeats: totalSeats || 180
    });

    await newFlight.save();

    res.status(201).json({ message: 'Flight added successfully' });
  } catch (error) {
    console.error('Add flight error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

const updateFlight = async (req, res) => {
  try {
    const { flightId, name, origin, destination, date, departureTime, arrivalTime, price, totalSeats } = req.body;

    const flight = await Flight.findOne({ flightId });
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.name = name;
    flight.origin = origin;
    flight.destination = destination;
    flight.date = date;
    flight.departureTime = departureTime;
    flight.arrivalTime = arrivalTime;
    flight.price = price;
    flight.totalSeats = totalSeats;

    await flight.save();

    res.json({ message: 'Flight updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFlightStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.status = status;
    await flight.save();

    res.json({ message: 'Flight status updated successfully', flight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchFlight = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addFlight, updateFlight, updateFlightStatus, fetchFlight, fetchFlightById };