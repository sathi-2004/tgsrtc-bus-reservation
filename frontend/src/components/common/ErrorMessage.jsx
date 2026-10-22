import React from 'react';

const ErrorMessage = ({ message = 'An error occurred while processing your request.', onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 my-3 rounded-3 shadow-sm" role="alert">
      <div className="d-flex align-items-center">
        <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i>
        <div>
          <h6 className="alert-heading mb-1 fw-bold">Notice</h6>
          <p className="mb-0 small">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i> Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
