require('dotenv').config();
require('./config/db');
const Flight = require('./models/Flight');
const User = require('./models/User');
const Booking = require('./models/Booking');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    // Clear existing data
    await Flight.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    console.log('Cleared existing data');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        usertype: 'admin',
        approval: 'approved'
      },
      {
        username: 'operator1',
        email: 'operator@example.com',
        password: hashedPassword,
        usertype: 'flight-operator',
        approval: 'approved'
      },
      {
        username: 'user1',
        email: 'user@example.com',
        password: hashedPassword,
        usertype: 'user',
        approval: 'approved'
      }
    ]);

    console.log('Created sample users');

    // Create sample flights
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const flights = await Flight.insertMany([
      {
        name: 'IndiGo',
        flightId: '6E-101',
        origin: 'Delhi',
        destination: 'Mumbai',
        date: today.toISOString().split('T')[0],
        departureTime: '08:00',
        arrivalTime: '10:30',
        price: 5500,
        totalSeats: 180
      },
      {
        name: 'Air India',
        flightId: 'AI-202',
        origin: 'Mumbai',
        destination: 'Bangalore',
        date: tomorrow.toISOString().split('T')[0],
        departureTime: '14:00',
        arrivalTime: '15:30',
        price: 4800,
        totalSeats: 150
      },
      {
        name: 'SpiceJet',
        flightId: 'SG-303',
        origin: 'Delhi',
        destination: 'Kolkata',
        date: dayAfter.toISOString().split('T')[0],
        departureTime: '18:00',
        arrivalTime: '20:15',
        price: 4200,
        totalSeats: 189
      },
      {
        name: 'Vistara',
        flightId: 'UK-404',
        origin: 'Chennai',
        destination: 'Hyderabad',
        date: today.toISOString().split('T')[0],
        departureTime: '12:00',
        arrivalTime: '13:15',
        price: 3800,
        totalSeats: 158
      },
      {
        name: 'GoAir',
        flightId: 'G8-505',
        origin: 'Pune',
        destination: 'Goa',
        date: tomorrow.toISOString().split('T')[0],
        departureTime: '16:30',
        arrivalTime: '17:45',
        price: 3200,
        totalSeats: 144
      }
    ]);

    console.log('Created sample flights');

    // Create sample bookings
    const bookings = await Booking.insertMany([
      {
        userId: users[2]._id.toString(),
        userEmail: users[2].email,
        flight: flights[0]._id,
        flightId: flights[0].flightId,
        flightName: flights[0].name,
        origin: flights[0].origin,
        destination: flights[0].destination,
        date: flights[0].date,
        departureTime: flights[0].departureTime,
        arrivalTime: flights[0].arrivalTime,
        seatClass: 'economy',
        seats: 2,
        passengers: [
          { name: 'John Doe', age: 30, gender: 'Male', seatNumber: 'E1' },
          { name: 'Jane Doe', age: 28, gender: 'Female', seatNumber: 'E2' }
        ],
        totalAmount: 11000,
        status: 'confirmed'
      },
      {
        userId: users[2]._id.toString(),
        userEmail: users[2].email,
        flight: flights[1]._id,
        flightId: flights[1].flightId,
        flightName: flights[1].name,
        origin: flights[1].origin,
        destination: flights[1].destination,
        date: flights[1].date,
        departureTime: flights[1].departureTime,
        arrivalTime: flights[1].arrivalTime,
        seatClass: 'business',
        seats: 1,
        passengers: [
          { name: 'John Doe', age: 30, gender: 'Male', seatNumber: 'B1' }
        ],
        totalAmount: 7200,
        status: 'confirmed'
      }
    ]);

    console.log('Created sample bookings');
    console.log('Sample data seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@example.com / password123');
    console.log('Operator: operator@example.com / password123');
    console.log('User: user@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();