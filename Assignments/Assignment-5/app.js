// app.js
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./Routes/bookRoute.js');

const app = express();
const PORT = 8000;

// --- Basic logging middleware ---
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// parse JSON bodies
app.use(express.json());

// routes
app.use('/books', bookRoutes);

// basic health-check
app.get('/', (req, res) => res.send({ message: 'Book Management API is running' }));

const MONGO_URI = 'mongodb://localhost:27017/bookdb';

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});