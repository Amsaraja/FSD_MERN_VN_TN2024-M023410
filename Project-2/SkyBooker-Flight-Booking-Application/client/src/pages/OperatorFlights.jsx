import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Plane, Edit, Trash2, Eye, AlertCircle, Save, X } from 'lucide-react';

function OperatorFlights() {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [flightsRes, bookingsRes] = await Promise.all([
        api.get('/flights'),
        api.get('/bookings/all')
      ]);
      setFlights(flightsRes.data);
      setBookings(bookingsRes.data || []);
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

  const updateFlightStatus = async (flightId, status) => {
    try {
      await api.put(`/flights/${flightId}/status`, { status });
      setFlights(flights.map(flight => 
        flight._id === flightId ? { ...flight, status } : flight
      ));
    } catch (error) {
      console.error('Error updating flight status:', error);
      alert('Error updating flight status: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const startEdit = (flight) => {
    setEditingFlight(flight._id);
    setEditForm({
      name: flight.name,
      origin: flight.origin,
      destination: flight.destination,
      date: flight.date,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      totalSeats: flight.totalSeats
    });
  };

  const cancelEdit = () => {
    setEditingFlight(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    try {
      const flight = flights.find(f => f._id === editingFlight);
      await api.put('/flights/update-flight', {
        flightId: flight.flightId,
        ...editForm
      });
      setFlights(flights.map(f => 
        f._id === editingFlight ? { ...f, ...editForm } : f
      ));
      setEditingFlight(null);
      setEditForm({});
      alert('Flight updated successfully!');
    } catch (error) {
      console.error('Error updating flight:', error);
      alert('Error updating flight: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const viewFlightDetails = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  if (loading) {
    return <div className="loading">Loading flights...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Plane size={24} style={{ marginRight: '8px', display: 'inline' }} />
          Manage Flights ({flights.length})
        </h2>

        {flights.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Plane size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>No flights found.</p>
          </div>
        ) : (
          flights.map(flight => {
            const bookedSeats = getBookedSeats(flight);
            const availableSeats = (flight.totalSeats || 180) - bookedSeats;
            const isEditing = editingFlight === flight._id;
            
            return (
              <div key={flight._id} className="flight-card" style={{ marginBottom: '1rem' }}>
                {isEditing ? (
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Airline Name"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="text"
                        placeholder="Origin"
                        value={editForm.origin || ''}
                        onChange={(e) => setEditForm({...editForm, origin: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="text"
                        placeholder="Destination"
                        value={editForm.destination || ''}
                        onChange={(e) => setEditForm({...editForm, destination: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="date"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="time"
                        placeholder="Departure Time"
                        value={editForm.departureTime || ''}
                        onChange={(e) => setEditForm({...editForm, departureTime: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="time"
                        placeholder="Arrival Time"
                        value={editForm.arrivalTime || ''}
                        onChange={(e) => setEditForm({...editForm, arrivalTime: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="number"
                        placeholder="Total Seats"
                        value={editForm.totalSeats || ''}
                        onChange={(e) => setEditForm({...editForm, totalSeats: e.target.value})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={saveEdit} className="btn" style={{ background: '#28a745', padding: '0.5rem 1rem' }}>
                        <Save size={16} style={{ marginRight: '4px' }} />
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                        <X size={16} style={{ marginRight: '4px' }} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flight-info">
                      <div>
                        <div className="flight-route">
                          {flight.flightId}: {flight.origin} → {flight.destination}
                        </div>
                        <div className="flight-details">
                          {flight.date || new Date(flight.createdAt).toLocaleDateString()} • {flight.departureTime || '10:00'} - {flight.arrivalTime || '12:00'}
                        </div>
                        <div className="flight-details">
                          ₹{flight.price} • {bookedSeats}/{flight.totalSeats || 180} seats booked • {availableSeats} available
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select 
                        value={flight.status || 'scheduled'} 
                        onChange={(e) => updateFlightStatus(flight._id, e.target.value)}
                        style={{ 
                          padding: '0.5rem', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          background: flight.status === 'cancelled' ? '#fee' : 
                                     flight.status === 'delayed' ? '#fff3cd' : '#e8f5e8'
                        }}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.5rem' }}
                        onClick={() => startEdit(flight)}
                        title="Edit Flight"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.5rem' }}
                        onClick={() => viewFlightDetails(flight)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Flight Details Modal */}
      {showModal && selectedFlight && (
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
              <h3>Flight Details</h3>
              <button 
                onClick={closeModal}
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
                <strong>Flight Number:</strong> {selectedFlight.flightId}
              </div>
              <div>
                <strong>Route:</strong> {selectedFlight.origin} → {selectedFlight.destination}
              </div>
              <div>
                <strong>Date:</strong> {selectedFlight.date || new Date(selectedFlight.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Departure:</strong> {selectedFlight.departureTime || '10:00'}
              </div>
              <div>
                <strong>Arrival:</strong> {selectedFlight.arrivalTime || '12:00'}
              </div>
              <div>
                <strong>Price:</strong> ₹{selectedFlight.price}
              </div>
              <div>
                <strong>Aircraft:</strong> {selectedFlight.name || 'Boeing 737'}
              </div>
              <div>
                <strong>Seats:</strong> {getBookedSeats(selectedFlight)}/{selectedFlight.totalSeats || 180} booked • {(selectedFlight.totalSeats || 180) - getBookedSeats(selectedFlight)} available
              </div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  marginLeft: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  background: selectedFlight.status === 'cancelled' ? '#dc3545' : 
                             selectedFlight.status === 'delayed' ? '#ffc107' : '#28a745',
                  color: 'white',
                  fontSize: '0.8rem'
                }}>
                  {selectedFlight.status || 'scheduled'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={closeModal} 
              className="btn" 
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OperatorFlights;