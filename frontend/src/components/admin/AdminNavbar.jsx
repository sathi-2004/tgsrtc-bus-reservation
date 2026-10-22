import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="navbar navbar-expand bg-white border-bottom shadow-sm px-4 py-2 sticky-top">
      <div className="d-flex align-items-center gap-3">
        <Link to="/admin/dashboard" className="navbar-brand d-flex align-items-center gap-2 m-0">
          <span className="badge bg-danger p-2 fs-6">TGSRTC</span>
          <span className="fw-bold text-dark fs-5">ADMIN CONTROL CENTER</span>
        </Link>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-none d-md-inline">
          Live Transport Operations
        </span>
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <Link to="/" className="btn btn-outline-secondary btn-sm" target="_blank" rel="noreferrer">
          <i className="bi bi-box-arrow-up-right me-1"></i> Public Portal
        </Link>
        <div className="vr d-none d-sm-block"></div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-none d-md-block text-end">
            <div className="small fw-bold text-dark">{currentUser?.name || 'Administrator'}</div>
            <div className="text-muted" style={{ fontSize: '0.72rem' }}>
              {currentUser?.email || 'admin@tgsrtc.gov.in'}
            </div>
          </div>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
            title="Sign out of Admin Session"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
