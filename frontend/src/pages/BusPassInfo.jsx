import React from 'react';
import { Link } from 'react-router-dom';

const BusPassInfo = () => {
  const passes = [
    {
      title: 'Maha Lakshmi Free Travel Scheme',
      category: 'Women & Girl Students',
      validity: 'Permanent (Telangana Domicile)',
      eligibility: 'All women, girl students, and transgender persons resident in Telangana.',
      routes: 'Pallevelugu, Express, City Ordinary, Metro Express',
      documents: 'Aadhaar Card with Telangana residential address / Domicile Certificate',
      fee: 'Zero Fare (100% Subsidized by Govt of Telangana)',
      badge: 'bg-danger'
    },
    {
      title: 'Student Bus Pass (School & College)',
      category: 'Academic Institutions',
      validity: 'Academic Year (June to April)',
      eligibility: 'Bona-fide students of recognized educational institutions up to 35 years.',
      routes: 'City Ordinary, Sub-urban & District Rural Services up to 35 km radius',
      documents: 'Institution Bonafide Certificate, SSC memo copy, 2 Passport Photos',
      fee: 'Free for Girls up to Class 10; Subsidized quarterly fee for College students',
      badge: 'bg-primary'
    },
    {
      title: 'General Commuter Monthly Pass',
      category: 'Daily Urban & Intercity Commuters',
      validity: 'Monthly / Quarterly',
      eligibility: 'General public commuters travelling regularly between fixed city stages.',
      routes: 'City Ordinary, Metro Express, Metro Deluxe',
      documents: 'Any Government Photo ID (Aadhaar / Voter ID / Driving License)',
      fee: 'Standard flat discounted monthly tariff (e.g. ₹1,150/month)',
      badge: 'bg-success'
    },
    {
      title: 'Employee / NGO Transit Pass',
      category: 'Government & Corporate Employees',
      validity: 'Annual / Bi-Annual',
      eligibility: 'State Government employees, institutional staff, and accredited journalists.',
      routes: 'All Express and City services across Twin Cities & District Depots',
      documents: 'Department Identity Card, Service Certificate from DDO',
      fee: 'Concessional department rate',
      badge: 'bg-warning text-dark'
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-danger px-3 py-2 text-uppercase mb-2">
          <i className="bi bi-card-checklist me-1"></i> Public Concessions & Welfare
        </span>
        <h2 className="fw-bold text-dark">TGSRTC Bus Pass Information & Schemes</h2>
        <p className="text-secondary small max-w-700 mx-auto">
          Explore citizen transit concessions, student passes, and government subsidized transit initiatives operated across Telangana.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {passes.map((pass, idx) => (
          <div key={idx} className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className={`badge ${pass.badge} px-3 py-2 small`}>{pass.category}</span>
                <span className="text-muted small fw-semibold">
                  <i className="bi bi-calendar3 me-1"></i> {pass.validity}
                </span>
              </div>
              <h5 className="fw-bold text-dark mb-2">{pass.title}</h5>
              <p className="text-secondary small mb-3">{pass.eligibility}</p>

              <div className="p-3 bg-light rounded-3 small mb-3">
                <div className="mb-2">
                  <strong className="text-dark">Eligible Bus Classes:</strong>
                  <div className="text-secondary">{pass.routes}</div>
                </div>
                <div className="mb-2">
                  <strong className="text-dark">Required Credentials:</strong>
                  <div className="text-secondary">{pass.documents}</div>
                </div>
                <div>
                  <strong className="text-dark">Applicable Tariff:</strong>
                  <div className="text-success fw-bold">{pass.fee}</div>
                </div>
              </div>

              <div className="mt-auto d-flex gap-2">
                <a
                  href="#application-guide"
                  className="btn btn-outline-primary btn-sm flex-grow-1"
                >
                  <i className="bi bi-info-circle me-1"></i> View Guidelines
                </a>
                <Link to="/contact" className="btn btn-primary btn-sm px-3">
                  Inquire at Depot
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Section */}
      <div id="application-guide" className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <h4 className="fw-bold text-dark mb-3">How to Apply for an RTC Bus Pass:</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="badge bg-primary rounded-circle p-2 mb-2">1</span>
              <h6 className="fw-bold text-dark">Submit Application</h6>
              <p className="small text-secondary mb-0">
                Collect physical application form at any RTC Bus Station Pass Counter or submit through the Telangana State Meeseva online portal.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="badge bg-primary rounded-circle p-2 mb-2">2</span>
              <h6 className="fw-bold text-dark">Institutional Attestation</h6>
              <p className="small text-secondary mb-0">
                For student passes, obtain headmaster/principal signature and institutional seal on the bonafide verification form.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="badge bg-primary rounded-circle p-2 mb-2">3</span>
              <h6 className="fw-bold text-dark">Biometric Card Issue</h6>
              <p className="small text-secondary mb-0">
                Visit designated Bus Depot Pass Center for photo capture, ID verification, and instantaneous RFID smart card printing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusPassInfo;
