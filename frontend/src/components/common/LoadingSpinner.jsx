import React from 'react';

const LoadingSpinner = ({ message = 'Loading bus schedules...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem', color: '#003366' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted fw-semibold">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
