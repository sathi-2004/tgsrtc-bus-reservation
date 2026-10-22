import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center my-5">
      <div className="display-1 fw-bold text-danger mb-2">404</div>
      <h3 className="fw-bold text-dark mb-2">Route or Page Not Found</h3>
      <p className="text-secondary small max-w-500 mx-auto mb-4">
        The destination schedule or reservation page you requested does not exist or may have been relocated.
      </p>
      <div className="d-flex justify-content-center gap-2">
        <Link to="/" className="btn btn-tgsrtc-primary px-4">
          <i className="bi bi-house-door me-1"></i> Return Home
        </Link>
        <Link to="/search" className="btn btn-outline-secondary px-4">
          <i className="bi bi-search me-1"></i> Search Buses
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
