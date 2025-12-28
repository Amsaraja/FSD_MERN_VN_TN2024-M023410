const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flight-booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('Please ensure MongoDB is running on localhost:27017');
    // Don't exit, let server run without database for now
  }
};

connectDB();
