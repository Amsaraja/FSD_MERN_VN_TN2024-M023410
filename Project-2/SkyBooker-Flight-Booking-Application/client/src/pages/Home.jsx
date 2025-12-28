import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Find Your Perfect Flight</h1>
          <p>Book flights to destinations worldwide with the best prices</p>
          <Link to="/flights" className="btn" style={{ marginTop: '2rem', display: 'inline-block' }}>
            Search Flights
          </Link>
        </div>
      </section>

      <div className="container">
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose SkyBooker?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Search size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3>Easy Search</h3>
              <p>Find flights quickly with our intuitive search interface</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3>Global Destinations</h3>
              <p>Fly to hundreds of destinations around the world</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Calendar size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3>Flexible Dates</h3>
              <p>Choose from flexible date options for better deals</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Users size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3>Group Bookings</h3>
              <p>Book for multiple passengers with ease</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;