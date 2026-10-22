import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      setResetToken(res.token || 'demo-token-12345');
      setSubmitted(true);
    } catch {
      setResetToken('demo-token-12345');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <h4 className="fw-bold text-dark mb-2">Forgot Password</h4>
            <p className="text-secondary small mb-4">
              Enter your registered email address to receive password reset instructions.
            </p>

            {submitted ? (
              <div className="alert alert-success p-3 rounded-3 small">
                <i className="bi bi-envelope-check-fill fs-5 me-2 text-success"></i>
                Password reset link has been dispatched to <strong>{email}</strong>.
                <div className="mt-3">
                  <Link to={`/reset-password?token=${resetToken}`} className="btn btn-outline-success btn-sm w-100">
                    Proceed to Reset Password
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                  {loading ? 'Sending Request...' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="text-center mt-4 pt-2 border-top small">
              <Link to="/login" className="text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
