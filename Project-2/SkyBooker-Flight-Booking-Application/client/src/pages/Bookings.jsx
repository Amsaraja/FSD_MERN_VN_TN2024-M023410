import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Ticket, Calendar, MapPin, User, X, AlertTriangle } from 'lucide-react';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setCancellingId(bookingId);
    try {
      await api.put(`/bookings/cancel-ticket/${bookingId}`);
      await fetchBookings(); // Refresh bookings
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Ticket size={24} style={{ marginRight: '8px', display: 'inline' }} />
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Ticket size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>No bookings found. Book your first flight!</p>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="flight-card" style={{ marginBottom: '1rem' }}>
              <div className="flight-info">
                <div>
                  <div className="flight-route">
                    {booking.origin} → {booking.destination}
                  </div>
                  <div className="flight-details">
                    <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                    Flight {booking.flightId} • {booking.date}
                  </div>
                  <div className="flight-details">
                    <User size={14} style={{ marginRight: '4px', display: 'inline' }} />
                    {booking.passengers?.length || booking.seats} passenger(s) • {booking.departureTime} - {booking.arrivalTime}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div className="flight-price">₹{booking.totalAmount}</div>
                <div style={{ 
                  background: booking.status === 'confirmed' ? '#28a745' : '#dc3545',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {booking.status}
                </div>
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    disabled={cancellingId === booking._id}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: cancellingId === booking._id ? 0.6 : 1
                    }}
                  >
                    <X size={12} />
                    {cancellingId === booking._id ? 'Cancelling...' : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;