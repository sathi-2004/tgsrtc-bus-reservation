import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        if (res.user?.roles?.includes('ROLE_ADMIN') || res.user?.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate(from);
        }
      } else {
        setError('Invalid email or password credentials.');
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="bg-primary text-white p-4 text-center" style={{ backgroundColor: '#003366' }}>
              <div className="brand-logo-badge d-inline-block mb-2">TGSRTC</div>
              <h4 className="fw-bold mb-0">Passenger Sign In</h4>
              <span className="small opacity-75">Access My Bookings & Manage Journeys</span>
            </div>

            <div className="card-body p-4 p-md-5">
              {error && (
                <div className="alert alert-danger py-2 small mb-3">
                  <i className="bi bi-exclamation-triangle me-2"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope text-primary"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="e.g. passenger@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">Password *</label>
                    <Link to="/forgot-password" className="small text-decoration-none text-primary">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock text-primary"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter account password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-tgsrtc-primary w-100 py-2 fw-bold mt-2"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Account'}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top small text-secondary">
                Don't have an account yet?{' '}
                <Link to="/register" className="fw-bold text-danger text-decoration-none">
                  Register Now
                </Link>
              </div>

              {/* Demo Credentials Helper Box */}
              <div className="p-3 bg-light rounded-3 mt-3 small text-secondary">
                <strong>Quick Demo Access:</strong>
                <div className="mt-1">Passenger: <code>passenger@example.com</code> / <code>Pass@123</code></div>
                <div>Admin: <code>admin@tgsrtc.gov.in</code> / <code>Admin@123</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
