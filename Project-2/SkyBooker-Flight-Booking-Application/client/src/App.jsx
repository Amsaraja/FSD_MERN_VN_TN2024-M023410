import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Flights from './pages/Flights.jsx';
import Bookings from './pages/Bookings.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import AdminOperators from './pages/AdminOperators.jsx';
import OperatorDashboard from './pages/OperatorDashboard.jsx';
import OperatorFlights from './pages/OperatorFlights.jsx';
import OperatorBookings from './pages/OperatorBookings.jsx';
import OperatorRejected from './pages/OperatorRejected.jsx';
import NewFlights from './pages/NewFlights.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/dashboard" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/new-flights" element={<AdminOperatorRoute><NewFlights /></AdminOperatorRoute>} />
          <Route path="/operator/flights" element={<OperatorRoute><OperatorFlights /></OperatorRoute>} />
          <Route path="/operator/bookings" element={<OperatorRoute><OperatorBookings /></OperatorRoute>} />
          <Route path="/operator/rejected" element={<OperatorRejected />} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/operators" element={<AdminRoute><AdminOperators /></AdminRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminOperatorRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.usertype !== 'admin' && user.usertype !== 'flight-operator') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '400px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You need admin or operator privileges to access this page.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    );
  }
  if (user.usertype === 'flight-operator' && user.approval === 'rejected') {
    return <Navigate to="/operator/rejected" />;
  }
  if (user.usertype === 'flight-operator' && user.approval === 'not-approved') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '400px' }}>
          <h2 style={{ color: '#ffc107' }}>Approval Pending</h2>
          <p>Your operator application is pending admin approval.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    );
  }
  return children;
}

function OperatorRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.usertype !== 'flight-operator' && user.usertype !== 'admin') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '400px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You need operator privileges to access this page.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    );
  }
  if (user.usertype === 'flight-operator' && user.approval === 'rejected') {
    return <Navigate to="/operator/rejected" />;
  }
  if (user.usertype === 'flight-operator' && user.approval === 'not-approved') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '400px' }}>
          <h2 style={{ color: '#ffc107' }}>Approval Pending</h2>
          <p>Your operator application is pending admin approval.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    );
  }
  return children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.usertype !== 'admin') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '400px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    );
  }
  return children;
}

function RoleDashboard() {
  const { user } = useAuth();
  
  if (user.usertype === 'flight-operator' && user.approval === 'rejected') {
    return <Navigate to="/operator/rejected" />;
  }
  
  if (user.usertype === 'flight-operator' && user.approval === 'not-approved') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '500px' }}>
          <h2 style={{ color: '#ffc107', marginBottom: '1rem' }}>Approval Pending</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            Your flight operator application is currently under review by our admin team. 
            You will be notified once your application is approved.
          </p>
          <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ margin: 0, color: '#856404' }}>
              <strong>Status:</strong> Waiting for Admin Approval
            </p>
          </div>
          <Link to="/" className="btn">Go to Home</Link>
        </div>
      </div>
    );
  }
  
  switch (user.usertype) {
    case 'admin':
      return <AdminDashboard />;
    case 'flight-operator':
      return <OperatorDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
}

export default App;
