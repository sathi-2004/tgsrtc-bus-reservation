import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@tgsrtc.gov.in');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized administrator access.');
      }
    } catch {
      setError('Admin verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            <div className="bg-dark text-white p-4 text-center">
              <span className="badge bg-danger px-3 py-1 mb-2">RESTRICTED ACCESS</span>
              <h4 className="fw-bold mb-0">TGSRTC Officer Control Center</h4>
              <span className="small text-secondary">Authorized Transport Administrators Only</span>
            </div>

            <div className="card-body p-4 p-md-5">
              {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

              <form onSubmit={handleAdminSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Officer Email / Service ID</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary">Security Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 py-2 fw-bold" disabled={loading}>
                  {loading ? 'Verifying Authorization...' : 'Sign In as Administrator'}
                </button>
              </form>

              <div className="p-3 bg-light rounded-3 mt-4 small text-secondary">
                <i className="bi bi-shield-lock-fill text-warning me-1"></i>
                <strong>Default Master Credentials:</strong>
                <div>Email: <code>admin@tgsrtc.gov.in</code></div>
                <div>Password: <code>Admin@123</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
