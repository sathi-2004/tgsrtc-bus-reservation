import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 text-uppercase mb-2">
          <i className="bi bi-headset me-1"></i> 24x7 RTC Helpdesk
        </span>
        <h2 className="fw-bold text-dark">Contact Customer Support & Grievances</h2>
        <p className="text-secondary small">
          We are here to assist with online ticketing, bus delays, refund status, and feedback.
        </p>
      </div>

      <div className="row g-4">
        {/* Contact Info */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <h5 className="fw-bold text-dark mb-4">Official Contact Channels</h5>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="p-3 bg-primary-subtle text-primary rounded-3">
                <i className="bi bi-telephone-fill fs-4"></i>
              </div>
              <div>
                <strong className="text-dark d-block">24x7 Call Center</strong>
                <span className="text-secondary small">040-69440000 / 040-23450033</span>
                <div className="text-muted small">Toll Free across Telangana</div>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="p-3 bg-success-subtle text-success rounded-3">
                <i className="bi bi-envelope-fill fs-4"></i>
              </div>
              <div>
                <strong className="text-dark d-block">Online Ticket Assistance</strong>
                <span className="text-secondary small">online.support@tgsrtc.telangana.gov.in</span>
                <div className="text-muted small">Refund & E-Ticket inquiries</div>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="p-3 bg-danger-subtle text-danger rounded-3">
                <i className="bi bi-geo-alt-fill fs-4"></i>
              </div>
              <div>
                <strong className="text-dark d-block">Corporate Head Office</strong>
                <span className="text-secondary small">
                  Bus Bhavan, Musheerabad, Hyderabad - 500020, Telangana.
                </span>
              </div>
            </div>

            <div className="p-3 bg-light rounded-3 mt-auto">
              <strong className="text-dark small d-block mb-1">Major Bus Depots:</strong>
              <div className="small text-secondary">
                MGBS (Imlibun): 040-24614406 &bull; JBS (Secunderabad): 040-27802203 &bull; Warangal Depot: 0870-2424144 &bull; Nizamabad: 08462-224400
              </div>
            </div>
          </div>
        </div>

        {/* Feedback / Complaint Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Submit Passenger Inquiry / Feedback</h5>

            {submitted ? (
              <div className="alert alert-success p-4 rounded-3 text-center my-4">
                <i className="bi bi-check-circle-fill display-5 text-success d-block mb-2"></i>
                <h5>Inquiry Received Successfully!</h5>
                <p className="small text-secondary mb-0">
                  Your ticket/complaint reference number is <strong>GRV-{Date.now().toString().slice(-6)}</strong>. Our passenger support team will contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Category / Subject *</label>
                    <select
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    >
                      <option value="">Choose category</option>
                      <option value="Booking / E-Ticket Issue">Booking / E-Ticket Issue</option>
                      <option value="Cancellation & Refund">Cancellation & Refund</option>
                      <option value="Bus Timing & Punctuality">Bus Timing & Punctuality</option>
                      <option value="Luggage / Concession">Luggage / Concession</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Detailed Message / PNR *</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Please include your PNR or ticket reference if inquiring about a specific journey..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-tgsrtc-accent px-4 py-2">
                      Submit Grievance / Inquiry
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
