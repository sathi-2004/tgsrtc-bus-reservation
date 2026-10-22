import React from 'react';

const FAQs = () => {
  const faqData = [
    {
      q: 'How do I book a TGSRTC bus ticket online?',
      a: 'Select your origin and destination cities, journey date, and passengers on the home page. Choose your preferred bus service from the search results, click "Select Seats", pick your seats on the interactive layout, fill in passenger details, and complete payment via UPI, card, or net banking.'
    },
    {
      q: 'Do I need to carry a printed copy of my E-Ticket?',
      a: 'No. A valid SMS or soft copy PDF on your mobile phone along with original Government Photo ID (Aadhaar, Voter ID, PAN card, Driving License) is completely acceptable.'
    },
    {
      q: 'What is the Maha Lakshmi Scheme and who is eligible?',
      a: 'The Government of Telangana provides 100% free bus travel for all women and girl students domiciled in Telangana across Pallevelugu, Express, City Ordinary, and Metro Express buses within Telangana state limits.'
    },
    {
      q: 'How does cancellation and refund work?',
      a: 'You can cancel confirmed tickets up to 2 hours before scheduled departure. Cancellations requested > 48 hours prior to departure receive 90% refund; 24-48 hours receive 80%; 12-24 hours receive 70%. Refunds are processed directly to the original payment source within 3-5 banking days.'
    },
    {
      q: 'Can I track my bus location in real time?',
      a: 'Yes, visit the "Track Bus" page from the top navigation bar or your booking confirmation, enter your bus service number or schedule ID, and view current location, live speed, and stop timeline.'
    },
    {
      q: 'What is the maximum baggage allowed per passenger?',
      a: 'Each passenger is permitted up to 50 kg of personal luggage without additional charges on luxury and express buses.'
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 text-uppercase mb-2">
          <i className="bi bi-question-circle me-1"></i> Knowledge Base
        </span>
        <h2 className="fw-bold text-dark">Frequently Asked Questions</h2>
        <p className="text-secondary small">
          Find answers to common queries regarding online bus reservations, passes, and refunds.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="accordion shadow-sm rounded-3" id="faqAccordion">
            {faqData.map((item, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading-${idx}`}>
                  <button
                    className={`accordion-button fw-bold ${idx !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${idx}`}
                    aria-expanded={idx === 0 ? 'true' : 'false'}
                    aria-controls={`collapse-${idx}`}
                  >
                    {item.q}
                  </button>
                </h2>
                <div
                  id={`collapse-${idx}`}
                  className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading-${idx}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-secondary small" style={{ lineHeight: '1.6' }}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
