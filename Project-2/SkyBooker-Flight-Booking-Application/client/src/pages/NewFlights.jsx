import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { PlusCircle, Plane, MapPin, Calendar, DollarSign, Users, Clock } from 'lucide-react';

function NewFlights() {
  const { user } = useAuth();
  
  // Get current date and time in India (IST)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);
  const currentDate = istTime.toISOString().split('T')[0];
  const currentTime = istTime.toTimeString().slice(0, 5);
  
  const [flightData, setFlightData] = useState({
    flightNumber: '',
    from: '',
    to: '',
    date: currentDate,
    departureTime: currentTime,
    arrivalTime: '',
    price: '',
    seatsAvailable: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/flights/add-flight', {
        name: flightData.flightNumber, // Flight name/airline
        flightId: flightData.flightNumber, // Flight ID
        origin: flightData.from,
        destination: flightData.to,
        date: flightData.date,
        departureTime: flightData.departureTime,
        arrivalTime: flightData.arrivalTime,
        price: Number(flightData.price),
        totalSeats: Number(flightData.seatsAvailable)
      });
      
      setMessage('Flight added successfully!');
      setFlightData({
        flightNumber: '',
        from: '',
        to: '',
        date: currentDate,
        departureTime: currentTime,
        arrivalTime: '',
        price: '',
        seatsAvailable: ''
      });
    } catch (error) {
      setMessage('Error adding flight: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <PlusCircle size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <h2>Add New Flight</h2>
          <p>Add a new flight to the system</p>
        </div>

        {message && (
          <div className={message.includes('Error') ? 'error' : 'success'}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <Plane size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Flight Number
            </label>
            <input
              type="text"
              name="flightNumber"
              value={flightData.flightNumber}
              onChange={handleChange}
              required
              placeholder="e.g., AI101"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>
                <MapPin size={16} style={{ marginRight: '8px', display: 'inline' }} />
                From
              </label>
              <input
                type="text"
                name="from"
                value={flightData.from}
                onChange={handleChange}
                required
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
                name="to"
                value={flightData.to}
                onChange={handleChange}
                required
                placeholder="Destination city"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <Calendar size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={flightData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>
                <Clock size={16} style={{ marginRight: '8px', display: 'inline' }} />
                Departure Time
              </label>
              <input
                type="time"
                name="departureTime"
                value={flightData.departureTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Clock size={16} style={{ marginRight: '8px', display: 'inline' }} />
                Arrival Time
              </label>
              <input
                type="time"
                name="arrivalTime"
                value={flightData.arrivalTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>
                <DollarSign size={16} style={{ marginRight: '8px', display: 'inline' }} />
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={flightData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="5000"
              />
            </div>

            <div className="form-group">
              <label>
                <Users size={16} style={{ marginRight: '8px', display: 'inline' }} />
                Available Seats
              </label>
              <input
                type="number"
                name="seatsAvailable"
                value={flightData.seatsAvailable}
                onChange={handleChange}
                required
                min="1"
                placeholder="150"
              />
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Adding Flight...' : 'Add Flight'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewFlights;