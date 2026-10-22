import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <h2 className="fw-bold text-dark mb-3">Privacy Policy</h2>
        <p className="text-muted small mb-4">Last Updated: October 2026</p>

        <h5 className="fw-bold text-primary">1. Information Collected</h5>
        <p className="text-secondary small">
          We collect passenger names, age, gender, contact numbers, and email addresses solely to issue electronic tickets, dispatch journey SMS updates, and facilitate contactless bus travel.
        </p>

        <h5 className="fw-bold text-primary mt-4">2. Financial Data Security</h5>
        <p className="text-secondary small">
          All financial transactions are conducted across secure 256-bit SSL connections through RBI-authorized payment aggregators (e.g., Razorpay/Banks). Card numbers, CVVs, and UPI pins are never stored on our systems.
        </p>

        <h5 className="fw-bold text-primary mt-4">3. Data Retention & Sharing</h5>
        <p className="text-secondary small">
          Passenger data is securely maintained for statutory audit requirements and is not sold, rented, or shared with third-party advertisers.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
