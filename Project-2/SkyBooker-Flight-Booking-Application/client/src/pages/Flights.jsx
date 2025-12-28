import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { Search, MapPin, Calendar, Plane, Clock } from 'lucide-react';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const flightsRes = await api.get('/flights');
      const allFlightsData = flightsRes.data || [];
      setAllFlights(allFlightsData);
      setFlights(allFlightsData);
      
      if (user) {
        try {
          const bookingsRes = user.role === 'admin' || user.role === 'operator' 
            ? await api.get('/bookings/all')
            : await api.get('/bookings');
          setBookings(bookingsRes.data || []);
        } catch (bookingError) {
          console.log('Could not fetch bookings, using flight data only');
          setBookings([]);
        }
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookedSeats = (flight) => {
    return bookings
      .filter(booking => (booking.flightId === flight.flightId || booking.flight?._id === flight._id) && booking.status === 'confirmed')
      .reduce((total, booking) => total + (booking.seats || booking.passengers?.length || 1), 0);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    
    try {
      // Client-side filtering for better responsiveness
      let filteredFlights = allFlights;
      
      if (searchParams.from) {
        filteredFlights = filteredFlights.filter(flight => 
          flight.origin?.toLowerCase().includes(searchParams.from.toLowerCase())
        );
      }
      
      if (searchParams.to) {
        filteredFlights = filteredFlights.filter(flight => 
          flight.destination?.toLowerCase().includes(searchParams.to.toLowerCase())
        );
      }
      
      if (searchParams.date) {
        filteredFlights = filteredFlights.filter(flight => {
          if (!flight.date) return false;
          
          // Handle different date formats
          if (flight.date.includes('-')) {
            return flight.date === searchParams.date;
          }
          
          // Convert DD/MM/YYYY to YYYY-MM-DD for comparison
          const parts = flight.date.split('/');
          if (parts.length === 3) {
            const convertedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            return convertedDate === searchParams.date;
          }
          
          return false;
        });
      }
      
      setFlights(filteredFlights);
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({ from: '', to: '', date: '' });
    setFlights(allFlights);
  };

  const bookFlight = async (flight) => {
    if (!user) {
      alert('Please login to book flights');
      return;
    }

    const passengers = [{
      name: user.username || 'Passenger',
      age: 30,
      gender: 'male'
    }];

    try {
      await api.post('/bookings/book-ticket', {
        userId: user.id,
        userEmail: user.email,
        flightId: flight.flightId,
        flightName: flight.name,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        date: flight.date || new Date().toISOString().split('T')[0],
        seatClass: 'economy',
        passengers,
        totalAmount: flight.price
      });
      alert('Flight booked successfully!');
      fetchData();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error booking flight: ' + (error.response?.data?.message || 'Please try again'));
    }
  };

  if (loading) {
    return <div className="loading">Loading flights...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Search size={24} style={{ marginRight: '8px', display: 'inline' }} />
          Search Flights
        </h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>
              <MapPin size={16} style={{ marginRight: '8px', display: 'inline' }} />
              From
            </label>
            <input
              type="text"
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
              placeholder="Departure city"
            />
          </div>
          
          <div className="form-group">
            <label>
              <MapPin size={16} style={{ marginRight: '8px', display: 'inline' }} />
              To
            </label>
            <input
              type="text"
              value={searchParams.to}
              onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
              placeholder="Destination city"
            />
          </div>
          
          <div className="form-group">
            <label>
              <Calendar size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Date
            </label>
            <input
              type="date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn" disabled={searching}>
            {searching ? 'Searching...' : 'Search Flights'}
          </button>
          
          <button type="button" className="btn btn-secondary" onClick={clearSearch}>
            Clear
          </button>
        </form>
      </div>

      <div>
        <h3 style={{ margin: '2rem 0 1rem', color: 'white' }}>
          {searchParams.from || searchParams.to || searchParams.date ? 'Search Results' : 'Available Flights'} ({flights.length})
          {(searchParams.from || searchParams.to || searchParams.date) && (
            <span style={{ fontSize: '0.8rem', marginLeft: '1rem' }}>
              {searchParams.from && `From: ${searchParams.from}`}
              {searchParams.to && ` To: ${searchParams.to}`}
              {searchParams.date && ` Date: ${searchParams.date}`}
            </span>
          )}
        </h3>
        
        {flights.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <Plane size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>No flights found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          flights.map(flight => {
            const bookedSeats = getBookedSeats(flight);
            const availableSeats = (flight.totalSeats || 180) - bookedSeats;
            
            return (
              <div key={flight._id} className="flight-card">
                <div className="flight-info">
                  <div>
                    <div className="flight-route">
                      {flight.origin} → {flight.destination}
                    </div>
                    <div className="flight-details">
                      <Clock size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      Flight {flight.flightId} • {flight.name}
                    </div>
                    <div className="flight-details">
                      {bookedSeats}/{flight.totalSeats || 180} seats booked • {availableSeats} available
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div className="flight-price">₹{flight.price}</div>
                  <button 
                    className="btn" 
                    onClick={() => bookFlight(flight)}
                    style={{ marginTop: '0.5rem' }}
                    disabled={availableSeats <= 0}
                  >
                    {availableSeats <= 0 ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Flights;
