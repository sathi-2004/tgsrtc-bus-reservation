import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const offersList = [
    {
      code: 'TGSRTC50',
      title: 'Flat ₹50 Off on Long-Distance Express',
      description: 'Book any Garuda Plus, Rajadhani, or AC Sleeper service above ₹500 and get flat ₹50 discount.',
      validity: 'Valid till 31 Dec 2026',
      badge: 'POPULAR'
    },
    {
      code: 'TSGOVT10',
      title: '10% Intercity Round-Trip Concession',
      description: 'Enjoy 10% off when reserving return journey tickets simultaneously on any express corridor.',
      validity: 'Applicable on Return Bookings',
      badge: 'ROUND TRIP'
    },
    {
      code: 'WEEKEND25',
      title: 'Weekend Travel Bonanza',
      description: 'Save 5% on Saturday and Sunday departures on Hyderabad - Bengaluru & Vijayawada routes.',
      validity: 'Weekends Only',
      badge: 'FESTIVE'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 text-uppercase mb-2">
          <i className="bi bi-tag-fill me-1"></i> Special RTC Concessions
        </span>
        <h2 className="fw-bold text-dark">Promotional Offers & Travel Discounts</h2>
        <p className="text-secondary small">
          Save on your bus journeys across Telangana with our latest promo codes and concession vouchers.
        </p>
      </div>

      <div className="row g-4">
        {offersList.map((offer, idx) => (
          <div key={idx} className="col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary px-3 py-1">{offer.badge}</span>
                <span className="text-muted small">{offer.validity}</span>
              </div>
              <h5 className="fw-bold text-dark mb-2">{offer.title}</h5>
              <p className="text-secondary small flex-grow-1">{offer.description}</p>

              <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3 border mt-3">
                <span className="font-monospace fw-bold text-primary fs-6">{offer.code}</span>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleCopy(offer.code)}
                >
                  {copiedCode === offer.code ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <Link to="/search" className="btn btn-tgsrtc-accent btn-sm w-100 mt-3">
                Book with this Offer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
