import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Users, UserCheck, UserX } from 'lucide-react';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/fetch-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveOperator = async (userId) => {
    try {
      await api.post('/admin/approve-operator', { userId });
      alert('Operator approved successfully');
      fetchUsers();
    } catch (error) {
      alert('Error approving operator');
    }
  };

  const rejectOperator = async (userId) => {
    try {
      await api.post('/admin/reject-operator', { userId });
      alert('Operator rejected successfully');
      fetchUsers();
    } catch (error) {
      alert('Error rejecting operator');
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2><Users size={24} style={{ marginRight: '8px' }} />Manage Users</h2>
        
        {users.map(user => (
          <div key={user._id} className="flight-card">
            <div className="flight-info">
              <div>
                <div className="flight-route">{user.username}</div>
                <div className="flight-details">{user.email} • {user.usertype}</div>
                <div className="flight-details">Status: {user.approval}</div>
              </div>
            </div>
            
            {user.usertype === 'flight-operator' && user.approval === 'not-approved' && (
              <div>
                <button onClick={() => approveOperator(user._id)} className="btn" style={{marginRight: '0.5rem'}}>
                  <UserCheck size={16} /> Approve
                </button>
                <button onClick={() => rejectOperator(user._id)} className="btn btn-secondary">
                  <UserX size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;