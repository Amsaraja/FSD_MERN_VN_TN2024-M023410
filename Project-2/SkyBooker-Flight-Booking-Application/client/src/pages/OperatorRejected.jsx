import { Link } from 'react-router-dom';
import { XCircle, Mail, Phone } from 'lucide-react';

function OperatorRejected() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', margin: '4rem auto', maxWidth: '500px' }}>
        <XCircle size={64} style={{ color: '#dc3545', marginBottom: '1rem' }} />
        <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>Application Rejected</h2>
        <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
          Your flight operator application has been rejected by the administrator. 
          This could be due to incomplete information or not meeting our requirements.
        </p>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>What you can do:</h4>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li>Contact our support team for more information</li>
            <li>Review and resubmit your application with correct details</li>
            <li>Ensure all required documents are provided</li>
          </ul>
        </div>

        <div style={{ 
          background: '#e8f4fd', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#0066cc' }}>Contact Support</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
              <Mail size={16} style={{ marginRight: '8px' }} />
              support@skybooker.com
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
              <Phone size={16} style={{ marginRight: '8px' }} />
              +1-800-SKY-BOOK
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn">
            Reapply
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OperatorRejected;