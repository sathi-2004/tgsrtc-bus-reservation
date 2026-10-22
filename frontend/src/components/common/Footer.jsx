import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto bg-dark text-white pt-5 pb-3 no-print" style={{ backgroundColor: '#0a192f' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Column 1: Corporation Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-danger p-2 fs-6">TGSRTC</span>
              <h5 className="mb-0 text-white fw-bold">Telangana State RTC</h5>
            </div>
            <p className="text-secondary small mb-3">
              Telangana State Road Transport Corporation is committed to providing consistently safe, clean, reliable, punctual, and courteous passenger transport across Telangana and neighboring southern states.
            </p>
            <div className="d-flex gap-3 text-secondary fs-5">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Booking Services */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase text-warning fw-bold mb-3">Quick Services</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/search" className="text-decoration-none text-light opacity-75">Online Booking</Link></li>
              <li><Link to="/view-ticket" className="text-decoration-none text-light opacity-75">Print E-Ticket</Link></li>
              <li><Link to="/cancel-ticket" className="text-decoration-none text-light opacity-75">Cancel Ticket</Link></li>
              <li><Link to="/track-bus" className="text-decoration-none text-light opacity-75">Live Bus Tracking</Link></li>
              <li><Link to="/bus-pass" className="text-decoration-none text-light opacity-75">Student & Citizen Pass</Link></li>
              <li><Link to="/my-bookings" className="text-decoration-none text-light opacity-75">My Bookings</Link></li>
            </ul>
          </div>

          {/* Column 3: Bus Fleet Categories */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase text-warning fw-bold mb-3">Bus Fleet Services</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><span className="text-light opacity-75">Garuda Plus (Multi-Axle AC)</span></li>
              <li><span className="text-light opacity-75">Rajadhani (AC Semi-Sleeper)</span></li>
              <li><span className="text-light opacity-75">Super Luxury (2+2 Non-AC)</span></li>
              <li><span className="text-light opacity-75">AC Sleeper & Non-AC Sleeper</span></li>
              <li><span className="text-light opacity-75">Deluxe & Express Services</span></li>
              <li><span className="text-light opacity-75">Pallevelugu (Rural Village Lifeline)</span></li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Head Office */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase text-warning fw-bold mb-3">RTC Head Office</h6>
            <div className="small text-secondary mb-2">
              <i className="bi bi-building me-2 text-warning"></i>
              Bus Bhavan, Musheerabad, Hyderabad - 500020, Telangana.
            </div>
            <div className="small text-secondary mb-2">
              <i className="bi bi-telephone-inbound me-2 text-warning"></i>
              24x7 Call Center: 040-69440000
            </div>
            <div className="small text-secondary mb-3">
              <i className="bi bi-envelope-at me-2 text-warning"></i>
              online.support@tgsrtc.telangana.gov.in
            </div>
            <div className="bg-secondary bg-opacity-25 p-2 rounded small text-light">
              <i className="bi bi-clock-history me-1 text-warning"></i> Online Booking Helpdesk: 24 Hours Open
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-50 my-4" />

        {/* Legal Disclaimer & Copyright */}
        <div className="row align-items-center">
          <div className="col-md-7 text-center text-md-start small text-secondary">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} TGSRTC Online Reservation Portal. All Rights Reserved.
            </p>
            <p className="mb-0 text-warning" style={{ fontSize: '0.78rem' }}>
              <strong>Notice:</strong> This web application is an educational full-stack demonstration project inspired by the TGSRTC booking portal and is not officially operated by TGSRTC.
            </p>
          </div>
          <div className="col-md-5 text-center text-md-end mt-3 mt-md-0 small">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 text-secondary">
              <Link to="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link>
              <span>&bull;</span>
              <Link to="/terms" className="text-secondary text-decoration-none">Terms of Service</Link>
              <span>&bull;</span>
              <Link to="/faqs" className="text-secondary text-decoration-none">FAQs</Link>
              <span>&bull;</span>
              <Link to="/admin/login" className="text-secondary text-decoration-none">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
