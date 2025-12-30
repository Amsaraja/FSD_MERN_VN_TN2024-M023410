# Flight Booking Application

A modern full-stack flight booking application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Flight search and filtering
- Date-based flight search
- Real-time seat availability
- Flight booking system
- Responsive modern UI
- Protected routes and JWT authentication

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Modern CSS with gradients and animations

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create `.env` file in the server directory:
```env
MONGO_URI=mongodb://localhost:27017/flight-booking
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

### 3. Database Setup

```bash
# Seed the database with sample flights
cd server
npm run seed
```

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

