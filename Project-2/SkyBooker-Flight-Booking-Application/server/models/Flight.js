const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  flightId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 0,
    default: 180
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'cancelled', 'completed'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
