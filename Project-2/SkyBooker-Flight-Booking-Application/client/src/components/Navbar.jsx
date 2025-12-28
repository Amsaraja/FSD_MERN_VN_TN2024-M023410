import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Plane, LogOut } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Plane size={24} style={{ marginRight: '8px', display: 'inline' }} />
        SkyBooker
      </Link>
      
      <ul className="nav-links">
        {(!user || user.usertype === 'user') && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/flights">Flights</Link></li>
          </>
        )}
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {user.usertype === 'user' && (
              <li><Link to="/bookings">My Bookings</Link></li>
            )}
            {user.usertype === 'admin' && (
              <>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/bookings">All Bookings</Link></li>
              </>
            )}
            {(user.usertype === 'admin' || user.usertype === 'flight-operator') && (
              <li><Link to="/new-flights">Add Flight</Link></li>
            )}
            <li className="user-info">
              {user.usertype.toUpperCase()} - {user.username}
            </li>
            <li>
              <button onClick={logout} className="btn btn-secondary">
                <LogOut size={16} style={{ marginRight: '4px' }} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;