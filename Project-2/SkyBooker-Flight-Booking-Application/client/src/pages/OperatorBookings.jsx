import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Ticket, User, Calendar, Filter, X, Clock } from 'lucide-react';

function OperatorBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, filter]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/all');
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;
    if (filter === 'confirmed') {
      filtered = bookings.filter(b => b.status === 'confirmed');
    } else if (filter === 'cancelled') {
      filtered = bookings.filter(b => b.status === 'cancelled');
    }
    setFilteredBookings(filtered);
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setCancellingId(bookingId);
    try {
      await api.put(`/bookings/cancel-ticket/${bookingId}`);
      await fetchBookings();
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>
            <Ticket size={24} style={{ marginRight: '8px', display: 'inline' }} />
            All Bookings ({filteredBookings.length})
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Ticket size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>No bookings found.</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking._id} className="flight-card" style={{ marginBottom: '1rem' }}>
              <div className="flight-info">
                <div>
                  <div className="flight-route">
                    {booking.flightId}: {booking.origin} → {booking.destination}
                  </div>
                  <div className="flight-details">
                    <User size={14} style={{ marginRight: '4px', display: 'inline' }} />
                    {booking.userEmail} • {booking.seatClass}
                  </div>
                  <div className="flight-details">
                    <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                    {booking.date} • 
                    <Clock size={14} style={{ marginLeft: '8px', marginRight: '4px', display: 'inline' }} />
                    {booking.departureTime} - {booking.arrivalTime} • {booking.passengers?.length || booking.seats} passenger(s)
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
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Booked: {new Date(booking.createdAt).toLocaleDateString()}
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

export default OperatorBookings;