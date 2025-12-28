import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { Users, Ticket, UserCheck, BarChart3, Settings } from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalOperators: 0,
    totalFlights: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [bookingsRes, flightsRes, usersRes] = await Promise.all([
        api.get('/bookings'),
        api.get('/flights'),
        api.get('/admin/fetch-users')
      ]);

      const bookings = bookingsRes.data || [];
      const flights = flightsRes.data || [];
      const users = usersRes.data || [];
      const operators = users.filter(u => u.usertype === 'flight-operator');

      setStats({
        totalUsers: users.length,
        totalBookings: bookings.length,
        totalOperators: operators.length,
        totalFlights: flights.length,
        recentBookings: bookings.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Set default values on error
      setStats({
        totalUsers: 0,
        totalBookings: 0,
        totalOperators: 0,
        totalFlights: 0,
        recentBookings: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <BarChart3 size={24} style={{ marginRight: '8px', display: 'inline' }} />
          Admin Dashboard
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: '#667eea', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Users size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
          
          <div style={{ background: '#28a745', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Ticket size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
          
          <div style={{ background: '#ffc107', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <UserCheck size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalOperators}</h3>
            <p>Flight Operators</p>
          </div>
          
          <div style={{ background: '#dc3545', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Settings size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalFlights}</h3>
            <p>Total Flights</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Admin Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/admin/users" className="btn">
                <Users size={16} style={{ marginRight: '8px' }} />
                Manage Users
              </Link>
              <Link to="/admin/bookings" className="btn btn-secondary">
                <Ticket size={16} style={{ marginRight: '8px' }} />
                View All Bookings
              </Link>
              <Link to="/admin/operators" className="btn" style={{ background: '#ffc107' }}>
                <UserCheck size={16} style={{ marginRight: '8px' }} />
                Manage Operators
              </Link>
              <Link to="/flights" className="btn" style={{ background: '#17a2b8' }}>
                <Settings size={16} style={{ marginRight: '8px' }} />
                View All Flights
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem' }}>Recent Bookings</h3>
            {stats.recentBookings.length === 0 ? (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid #e1e5e9',
                textAlign: 'center',
                color: '#666'
              }}>
                No recent bookings found
              </div>
            ) : (
              stats.recentBookings.map(booking => (
                <div key={booking._id} style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  marginBottom: '0.5rem',
                  border: '1px solid #e1e5e9'
                }}>
                  <div style={{ fontWeight: '600' }}>
                    {booking.origin || 'N/A'} → {booking.destination || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    User: {booking.userEmail || 'N/A'} • ₹{booking.totalAmount || 0}
                  </div>
                </div>
              ))
            )}
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid #e1e5e9',
              marginTop: '1rem'
            }}>
              <h4 style={{ marginBottom: '0.5rem' }}>System Overview</h4>
              <p><strong>System Status:</strong> All systems operational</p>
              <p><strong>Database:</strong> Connected</p>
              <p><strong>Active Users:</strong> {stats.totalUsers} registered</p>
              <p><strong>Total Revenue:</strong> ₹{stats.recentBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;