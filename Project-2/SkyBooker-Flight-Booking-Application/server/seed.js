require('dotenv').config();
require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Flight = require('./models/Flight');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Flight.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@flightbooking.com',
      password: hashedPassword,
      usertype: 'admin',
      approval: 'approved'
    });
    await adminUser.save();

    // Create sample flights
    const flights = [
      {
        name: 'Air India Express',
        flightId: 'AI101',
        origin: 'Delhi',
        destination: 'Mumbai',
        departureTime: '08:00',
        arrivalTime: '10:30',
        price: 5500,
        totalSeats: 180
      },
      {
        name: 'IndiGo',
        flightId: 'IG202',
        origin: 'Mumbai',
        destination: 'Bangalore',
        departureTime: '14:00',
        arrivalTime: '16:00',
        price: 4200,
        totalSeats: 180
      },
      {
        name: 'SpiceJet',
        flightId: 'SJ303',
        origin: 'Delhi',
        destination: 'Kolkata',
        departureTime: '11:30',
        arrivalTime: '13:45',
        price: 4800,
        totalSeats: 180
      },
      {
        name: 'Vistara',
        flightId: 'UK404',
        origin: 'Chennai',
        destination: 'Hyderabad',
        departureTime: '16:15',
        arrivalTime: '17:30',
        price: 3900,
        totalSeats: 180
      },
      {
        name: 'GoAir',
        flightId: 'G8505',
        origin: 'Pune',
        destination: 'Goa',
        departureTime: '09:45',
        arrivalTime: '11:00',
        price: 3200,
        totalSeats: 180
      }
    ];

    await Flight.insertMany(flights);

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@flightbooking.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();