import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="no-print">
      {/* Top Notice Bar */}
      <div className="top-notice-bar">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span>
              <i className="bi bi-telephone-fill text-warning me-1"></i>
              24x7 Helpline: <strong>040-69440000 / 040-23450033</strong>
            </span>
            <span className="d-none d-md-inline text-secondary">|</span>
            <span className="d-none d-md-inline">
              <i className="bi bi-envelope-fill text-warning me-1"></i>
              online.support@tgsrtc.telangana.gov.in
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/track-bus" className="d-flex align-items-center gap-1">
              <i className="bi bi-geo-alt-fill text-danger"></i> Track Bus (Live)
            </Link>
            <Link to="/view-ticket" className="d-none d-sm-inline">
              <i className="bi bi-ticket-perforated me-1"></i> Print / PNR Status
            </Link>
            <Link to="/cancel-ticket" className="d-none d-sm-inline">
              <i className="bi bi-x-circle me-1"></i> Cancel Ticket
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className="badge bg-warning text-dark text-decoration-none px-2 py-1">
                <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar navbar-expand-lg main-navbar">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <div className="brand-logo-badge">
              <i className="bi bi-bus-front-fill me-1 text-warning"></i> TGSRTC
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold fs-5 text-primary lh-1" style={{ color: '#003366' }}>
                TGSRTC ONLINE
              </span>
              <span className="text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                Telangana State Road Transport Corporation
              </span>
            </div>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#tgsrtcNavbarNav"
            aria-controls="tgsrtcNavbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="tgsrtcNavbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-1 py-2 py-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                  <i className="bi bi-house-door me-1"></i> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/search">
                  <i className="bi bi-search me-1"></i> Search Buses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/track-bus">
                  <i className="bi bi-compass me-1"></i> Bus Tracking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/bus-pass">
                  <i className="bi bi-credit-card-2-front me-1"></i> Bus Pass
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/offers">
                  <i className="bi bi-percent me-1"></i> Offers & Schemes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact">
                  <i className="bi bi-chat-dots me-1"></i> Contact Us
                </NavLink>
              </li>

              {/* User / Authentication Nav Item */}
              {isAuthenticated ? (
                <li className="nav-item dropdown ms-lg-2">
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3 py-1"
                    type="button"
                    id="userMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                    <span>{currentUser?.name || 'My Account'}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userMenuButton">
                    <li>
                      <Link className="dropdown-item py-2" to="/my-bookings">
                        <i className="bi bi-journal-bookmark-fill text-primary me-2"></i> My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/view-ticket">
                        <i className="bi bi-ticket-detailed text-success me-2"></i> View / Print Ticket
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/cancel-ticket">
                        <i className="bi bi-x-octagon text-danger me-2"></i> Cancel Ticket
                      </Link>
                    </li>
                    {isAdmin && (
                      <>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <Link className="dropdown-item py-2 text-warning fw-bold" to="/admin/dashboard">
                            <i className="bi bi-speedometer2 me-2"></i> Admin Control Panel
                          </Link>
                        </li>
                      </>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ms-lg-2 d-flex gap-2">
                  <Link to="/login" className="btn btn-outline-primary rounded-pill px-3 py-1">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                  <Link to="/register" className="btn btn-danger rounded-pill px-3 py-1" style={{ backgroundColor: '#c82333' }}>
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
