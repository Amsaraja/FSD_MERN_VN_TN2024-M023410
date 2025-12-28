import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { Plane, Ticket, Bell, Calendar, TrendingUp, X, Eye } from 'lucide-react';

function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingFlights: 0,
    totalSpent: 0,
    recentBookings: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStats, setSelectedStats] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const bookingsRes = await api.get('/bookings');
      const bookings = bookingsRes.data || [];
      
      const totalSpent = bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      
      const upcomingFlights = bookings.filter(b => {
        if (!b.date) return false;
        return new Date(b.date) > new Date();
      }).length;
      
      setStats({
        totalBookings: bookings.length,
        upcomingFlights: upcomingFlights,
        totalSpent: totalSpent,
        recentBookings: bookings.slice(0, 3),
        notifications: [
          `Welcome back, ${user?.username || 'User'}!`,
          'Check out our latest flight deals',
          bookings.length > 0 ? 'Your recent booking is confirmed' : 'Book your first flight today',
          'New routes available to popular destinations'
        ]
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setStats({
        totalBookings: 0,
        upcomingFlights: 0,
        totalSpent: 0,
        recentBookings: [],
        notifications: [
          `Welcome to SkyBooker, ${user?.username || 'User'}!`,
          'Start by booking your first flight'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedBooking(null);
  };

  const showStatsDetails = (type) => {
    let details = {};
    
    switch(type) {
      case 'bookings':
        details = {
          title: 'Total Bookings Details',
          data: [
            { label: 'Confirmed Bookings', value: stats.recentBookings.filter(b => b.status === 'confirmed').length },
            { label: 'Cancelled Bookings', value: stats.recentBookings.filter(b => b.status === 'cancelled').length },
            { label: 'Total Amount Spent', value: `₹${stats.totalSpent}` },
            { label: 'Average per Booking', value: stats.totalBookings > 0 ? `₹${Math.round(stats.totalSpent / stats.totalBookings)}` : '₹0' }
          ]
        };
        break;
      case 'upcoming':
        details = {
          title: 'Upcoming Flights Details',
          data: [
            { label: 'Total Upcoming', value: stats.upcomingFlights },
            { label: 'Next Flight', value: stats.recentBookings.find(b => new Date(b.date) > new Date())?.origin + ' → ' + stats.recentBookings.find(b => new Date(b.date) > new Date())?.destination || 'None' }
          ]
        };
        break;
      case 'spent':
        details = {
          title: 'Spending Details',
          data: [
            { label: 'Total Spent', value: `₹${stats.totalSpent}` },
            { label: 'Average per Flight', value: stats.totalBookings > 0 ? `₹${Math.round(stats.totalSpent / stats.totalBookings)}` : '₹0' }
          ]
        };
        break;
    }
    
    setSelectedStats(details);
    setShowStatsModal(true);
  };

  const closeStatsModal = () => {
    setShowStatsModal(false);
    setSelectedStats(null);
  };

  const dismissNotification = (index) => {
    setStats(prev => ({
      ...prev,
      notifications: prev.notifications.filter((_, i) => i !== index)
    }));
  };

  const quickBookFlight = () => {
    navigate('/flights');
  };

  const viewAllBookings = () => {
    navigate('/bookings');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Welcome back, {user?.username || 'User'}!
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div 
            style={{ 
              background: '#667eea', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              textAlign: 'center', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={() => showStatsDetails('bookings')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          >
            <Ticket size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
          
          <div 
            style={{ 
              background: '#28a745', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={() => showStatsDetails('upcoming')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(40, 167, 69, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          >
            <Calendar size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.upcomingFlights}</h3>
            <p>Upcoming Flights</p>
          </div>
          
          <div 
            style={{ 
              background: '#ffc107', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={() => showStatsDetails('spent')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(255, 193, 7, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          >
            <TrendingUp size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>₹{stats.totalSpent}</h3>
            <p>Total Spent</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={quickBookFlight} 
                className="btn"
                style={{
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
              >
                <Plane size={16} style={{ marginRight: '8px' }} />
                Book New Flight
              </button>
              <button 
                onClick={viewAllBookings} 
                className="btn btn-secondary"
                style={{
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
              >
                <Ticket size={16} style={{ marginRight: '8px' }} />
                View My Bookings
              </button>
            </div>
            
            {stats.recentBookings.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Recent Bookings</h4>
                {stats.recentBookings.map(booking => (
                  <div key={booking._id} style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    marginBottom: '0.5rem',
                    border: '1px solid #e1e5e9',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => viewBookingDetails(booking)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e9ecef';
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div>
                      <div style={{ fontWeight: '600' }}>
                        {booking.origin || 'N/A'} → {booking.destination || 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {booking.date || 'N/A'} • ₹{booking.totalAmount || 0}
                      </div>
                    </div>
                    <Eye size={16} style={{ color: '#667eea' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>
                <Bell size={20} style={{ marginRight: '8px', display: 'inline' }} />
                Notifications ({stats.notifications.length})
              </h3>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="btn btn-secondary"
                style={{ 
                  padding: '0.5rem',
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = '';
                }}
              >
                {showNotifications ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showNotifications && stats.notifications.map((notification, index) => (
              <div key={index} style={{ 
                background: '#e8f4fd', 
                padding: '1rem', 
                borderRadius: '8px', 
                marginBottom: '0.5rem',
                border: '1px solid #bee5eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                animation: 'slideIn 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d1ecf1';
                e.currentTarget.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#e8f4fd';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                <span>{notification}</span>
                <button 
                  onClick={() => dismissNotification(index)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: '#666',
                    transition: 'all 0.2s ease',
                    borderRadius: '50%',
                    padding: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#dc3545';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#666';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {!showNotifications && (
              <p style={{ color: '#666', fontStyle: 'italic' }}>Click "Show" to view notifications</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Details Modal */}
      {showStatsModal && selectedStats && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ 
            maxWidth: '400px', 
            margin: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>{selectedStats.title}</h3>
              <button 
                onClick={closeStatsModal}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {selectedStats.data.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem',
                  background: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  <span>{item.label}:</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                onClick={() => { closeStatsModal(); navigate('/bookings'); }}
                className="btn" 
                style={{ flex: 1 }}
              >
                View Bookings
              </button>
              <button 
                onClick={() => { closeStatsModal(); navigate('/flights'); }}
                className="btn btn-secondary" 
                style={{ flex: 1 }}
              >
                Book Flight
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ 
            maxWidth: '500px', 
            margin: '2rem',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Booking Details</h3>
              <button 
                onClick={closeBookingModal}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <strong>Booking Reference:</strong> {selectedBooking.bookingReference || selectedBooking._id}
              </div>
              <div>
                <strong>Flight:</strong> {selectedBooking.flightName || 'N/A'}
              </div>
              <div>
                <strong>Route:</strong> {selectedBooking.origin || 'N/A'} → {selectedBooking.destination || 'N/A'}
              </div>
              <div>
                <strong>Date:</strong> {selectedBooking.date || 'N/A'}
              </div>
              <div>
                <strong>Time:</strong> {selectedBooking.departureTime || 'N/A'} - {selectedBooking.arrivalTime || 'N/A'}
              </div>
              <div>
                <strong>Seats:</strong> {selectedBooking.seats || 1}
              </div>
              <div>
                <strong>Total Amount:</strong> ₹{selectedBooking.totalAmount || 0}
              </div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  marginLeft: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  background: selectedBooking.status === 'confirmed' ? '#28a745' : '#dc3545',
                  color: 'white',
                  fontSize: '0.8rem'
                }}>
                  {selectedBooking.status || 'confirmed'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={closeBookingModal} 
              className="btn" 
              style={{ 
                width: '100%', 
                marginTop: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;