import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { UserCheck, Mail, Calendar, Activity, CheckCircle, XCircle } from 'lucide-react';

function AdminOperators() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await api.get('/admin/operators');
      setOperators(response.data || []);
    } catch (error) {
      console.error('Error fetching operators:', error);
      setOperators([]);
    } finally {
      setLoading(false);
    }
  };

  const approveOperator = async (operatorId) => {
    try {
      await api.post('/admin/approve-operator', { userId: operatorId });
      alert('Operator approved successfully!');
      fetchOperators();
    } catch (error) {
      console.error('Error approving operator:', error);
      alert('Error approving operator: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const rejectOperator = async (operatorId) => {
    try {
      await api.post('/admin/reject-operator', { userId: operatorId });
      alert('Operator rejected!');
      fetchOperators();
    } catch (error) {
      console.error('Error rejecting operator:', error);
      alert('Error rejecting operator: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  if (loading) {
    return <div className="loading">Loading operators...</div>;
  }

  const pendingOperators = operators.filter(op => op.approval === 'not-approved');
  const approvedOperators = operators.filter(op => op.approval === 'approved');
  const rejectedOperators = operators.filter(op => op.approval === 'rejected');

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <UserCheck size={24} style={{ marginRight: '8px', display: 'inline' }} />
          Manage Operators ({operators.length})
        </h2>

        {/* Pending Approvals */}
        {pendingOperators.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#ffc107', marginBottom: '1rem' }}>Pending Approvals ({pendingOperators.length})</h3>
            {pendingOperators.map(operator => (
              <div key={operator._id} className="flight-card" style={{ marginBottom: '1rem', border: '2px solid #ffc107' }}>
                <div className="flight-info">
                  <div>
                    <div className="flight-route">{operator.username}</div>
                    <div className="flight-details">
                      <Mail size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      {operator.email}
                    </div>
                    <div className="flight-details">
                      <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      Registered: {new Date(operator.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button 
                    className="btn"
                    onClick={() => approveOperator(operator._id)}
                    style={{ background: '#28a745' }}
                  >
                    <CheckCircle size={16} style={{ marginRight: '4px' }} />
                    Approve
                  </button>
                  <button 
                    className="btn"
                    onClick={() => rejectOperator(operator._id)}
                    style={{ background: '#dc3545' }}
                  >
                    <XCircle size={16} style={{ marginRight: '4px' }} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approved Operators */}
        {approvedOperators.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>Approved Operators ({approvedOperators.length})</h3>
            {approvedOperators.map(operator => (
              <div key={operator._id} className="flight-card" style={{ marginBottom: '1rem', border: '2px solid #28a745' }}>
                <div className="flight-info">
                  <div>
                    <div className="flight-route">{operator.username}</div>
                    <div className="flight-details">
                      <Mail size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      {operator.email}
                    </div>
                    <div className="flight-details">
                      <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      Approved: {new Date(operator.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  background: '#28a745',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  <CheckCircle size={16} style={{ marginRight: '4px', display: 'inline' }} />
                  Approved
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rejected Operators */}
        {rejectedOperators.length > 0 && (
          <div>
            <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>Rejected Operators ({rejectedOperators.length})</h3>
            {rejectedOperators.map(operator => (
              <div key={operator._id} className="flight-card" style={{ marginBottom: '1rem', border: '2px solid #dc3545' }}>
                <div className="flight-info">
                  <div>
                    <div className="flight-route">{operator.username}</div>
                    <div className="flight-details">
                      <Mail size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      {operator.email}
                    </div>
                    <div className="flight-details">
                      <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                      Rejected: {new Date(operator.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  background: '#dc3545',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  <XCircle size={16} style={{ marginRight: '4px', display: 'inline' }} />
                  Rejected
                </div>
              </div>
            ))}
          </div>
        )}

        {operators.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <UserCheck size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>No operators found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOperators;