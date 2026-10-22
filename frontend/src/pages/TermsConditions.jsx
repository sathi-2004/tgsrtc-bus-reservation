import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <h2 className="fw-bold text-dark mb-3">Terms & Conditions of Reservation</h2>
        <p className="text-muted small mb-4">Effective: October 2026</p>

        <h5 className="fw-bold text-primary">1. Agreement to Transport Rules</h5>
        <p className="text-secondary small">
          By purchasing a reservation on this platform, passengers agree to comply with all transport regulations, motor vehicle safety rules, and corporation directives.
        </p>

        <h5 className="fw-bold text-primary mt-4">2. Reporting Time & Boarding</h5>
        <p className="text-secondary small">
          Passengers must report at the designated boarding platform at least 15 minutes prior to scheduled departure. Buses will not be detained for latecomers.
        </p>

        <h5 className="fw-bold text-primary mt-4">3. Educational & Demo Disclaimer</h5>
        <p className="text-secondary small">
          This portal is an educational full-stack demonstration inspired by the TGSRTC booking portal and is not officially operated by Telangana State Road Transport Corporation.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
