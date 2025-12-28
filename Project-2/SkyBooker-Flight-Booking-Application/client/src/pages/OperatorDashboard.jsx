import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { Plane, Ticket, PlusCircle, BarChart3, Clock } from 'lucide-react';

function OperatorDashboard() {
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalBookings: 0,
    todayFlights: 0,
    recentFlights: []
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOperatorData();
  }, []);

  const getBookedSeats = (flight) => {
    const matchingBookings = bookings.filter(booking => {
      return booking.flightId === flight.flightId && booking.status === 'confirmed';
    });
    
    console.log(`Flight ${flight.flightId}: Found ${matchingBookings.length} bookings`, matchingBookings);
    
    const totalBooked = matchingBookings.reduce((total, booking) => {
      const seats = booking.seats || booking.passengers?.length || 1;
      console.log(`Booking ${booking._id}: ${seats} seats`);
      return total + seats;
    }, 0);
    
    console.log(`Flight ${flight.flightId}: Total booked = ${totalBooked}, Available = ${(flight.totalSeats || 180) - totalBooked}`);
    return totalBooked;
  };

  const fetchOperatorData = async () => {
    try {
      const [flightsRes, bookingsRes] = await Promise.all([
        api.get('/flights'),
        api.get('/bookings/all')
      ]);

      const flights = flightsRes.data || [];
      const allBookings = bookingsRes.data || [];
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Filter bookings for flights that exist in our flights list
      const operatorBookings = allBookings.filter(booking => 
        flights.some(flight => flight._id === booking.flight || flight.flightId === booking.flightId)
      );
      
      setBookings(allBookings);
      setStats({
        totalFlights: flights.length,
        totalBookings: operatorBookings.length,
        todayFlights: flights.filter(f => {
          // Handle different date formats
          const flightDate = f.date;
          if (!flightDate) return false;
          
          // If date is already in YYYY-MM-DD format
          if (flightDate.includes('-')) {
            return flightDate === today;
          }
          
          // If date is in DD/MM/YYYY format, convert it
          const parts = flightDate.split('/');
          if (parts.length === 3) {
            const convertedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            return convertedDate === today;
          }
          
          return false;
        }).length,
        recentFlights: flights.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching operator data:', error);
      setStats({
        totalFlights: 0,
        totalBookings: 0,
        todayFlights: 0,
        recentFlights: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading operator dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <BarChart3 size={24} style={{ marginRight: '8px', display: 'inline' }} />
          Flight Operator Dashboard
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: '#667eea', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Plane size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalFlights}</h3>
            <p>Total Flights</p>
          </div>
          
          <div style={{ background: '#28a745', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Ticket size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
          
          <div style={{ background: '#ffc107', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <Clock size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{stats.todayFlights}</h3>
            <p>Today's Flights</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Operator Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/new-flights" className="btn">
                <PlusCircle size={16} style={{ marginRight: '8px' }} />
                Add New Flight
              </Link>
              <Link to="/operator/flights" className="btn btn-secondary">
                <Plane size={16} style={{ marginRight: '8px' }} />
                Manage Flights
              </Link>
              <Link to="/operator/bookings" className="btn" style={{ background: '#28a745' }}>
                <Ticket size={16} style={{ marginRight: '8px' }} />
                View Bookings
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem' }}>Recent Flights</h3>
            {stats.recentFlights.length === 0 ? (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid #e1e5e9',
                textAlign: 'center',
                color: '#666'
              }}>
                No flights found. <Link to="/new-flights" style={{ color: '#667eea' }}>Add your first flight</Link>
              </div>
            ) : (
              stats.recentFlights.map(flight => {
                const bookedSeats = getBookedSeats(flight);
                const availableSeats = (flight.totalSeats || 180) - bookedSeats;
                
                return (
                  <div key={flight._id} style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    marginBottom: '0.5rem',
                    border: '1px solid #e1e5e9'
                  }}>
                    <div style={{ fontWeight: '600' }}>
                      {flight.flightId || 'N/A'}: {flight.origin || 'N/A'} → {flight.destination || 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {flight.name || 'N/A'} • ₹{flight.price || 0} • {availableSeats} seats available
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperatorDashboard;