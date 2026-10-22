import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BusSearchForm from '../components/booking/BusSearchForm';
import routeService from '../services/routeService';
import { useBooking } from '../context/BookingContext';

const Home = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const { setSearchParams } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await routeService.getPopularRoutes();
      setPopularRoutes(data);
    };
    fetchRoutes();
  }, []);

  const handleRouteClick = (source, destination) => {
    const today = new Date().toISOString().split('T')[0];
    setSearchParams({
      from: source,
      to: destination,
      date: today,
      returnDate: '',
      passengers: 1
    });
    navigate(`/bus-results?from=${encodeURIComponent(source)}&to=${encodeURIComponent(destination)}&date=${today}&passengers=1`);
  };

  const serviceCategories = [
    {
      title: 'GARUDA PLUS',
      type: 'Multi-Axle AC Sleeper / Semi-Sleeper',
      description: 'Ultra-luxurious multi-axle Volvo & Scania buses with individual charging ports, WiFi, and air suspension.',
      badgeColor: 'bg-primary',
      icon: 'bi-gem'
    },
    {
      title: 'RAJADHANI',
      type: 'AC Semi-Sleeper',
      description: 'Air-conditioned intercity express connecting district headquarters with Hyderabad on non-stop priority routes.',
      badgeColor: 'bg-info text-dark',
      icon: 'bi-lightning-charge-fill'
    },
    {
      title: 'SUPER LUXURY',
      type: '2+2 Non-AC Pushback',
      description: 'Reliable, comfortable pushback seating connecting all major towns and cities across Telangana round the clock.',
      badgeColor: 'bg-success',
      icon: 'bi-stars'
    },
    {
      title: 'AC SLEEPER',
      type: 'Premium 2+1 Berths',
      description: 'Full-length comfortable berths with bedding and privacy curtains for peaceful overnight interstate travel.',
      badgeColor: 'bg-dark',
      icon: 'bi-moon-stars-fill'
    },
    {
      title: 'DELUXE & EXPRESS',
      type: '2+2 / 3+2 High Frequency',
      description: 'Cost-effective high-frequency transit serving towns and connecting rural hubs to commercial centers.',
      badgeColor: 'bg-warning text-dark',
      icon: 'bi-shield-check'
    },
    {
      title: 'PALLEVELUGU',
      type: 'Rural Lifeline',
      description: 'Connecting remote villages to district centers with affordable government subsidised transit fares.',
      badgeColor: 'bg-secondary',
      icon: 'bi-tree-fill'
    }
  ];

  return (
    <div className="home-page-view">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="container position-relative z-1">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8">
              <span className="badge bg-danger px-3 py-2 text-uppercase mb-2">
                <i className="bi bi-shield-check me-1"></i> Official State Passenger Transport Portal
              </span>
              <h1 className="display-5 fw-extrabold text-white mb-2">
                Safe, Punctual & Affordable Bus Travel Across Telangana
              </h1>
              <p className="lead text-light opacity-90 mb-0">
                Book official TGSRTC tickets online with 0% platform charges, real-time seat reservation, and live bus GPS tracking.
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-block text-end">
              <div className="bg-white bg-opacity-10 p-3 rounded-4 backdrop-blur border border-white border-opacity-25 d-inline-block text-start">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-patch-check-fill text-warning fs-4"></i>
                  <strong className="text-white">Government Assured Transit</strong>
                </div>
                <div className="small text-light opacity-90">&bull; 9,000+ Operational RTC Buses</div>
                <div className="small text-light opacity-90">&bull; 35+ Lakh Daily Happy Travellers</div>
                <div className="small text-light opacity-90">&bull; Direct State Depot Dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bus Search Form */}
      <section className="container">
        <div className="hero-search-box">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-search text-danger fs-5"></i>
            <h4 className="fw-bold mb-0 text-dark">Book Bus Tickets Online</h4>
          </div>
          <BusSearchForm />
        </div>
      </section>

      {/* RTC Quick Statistics Strip */}
      <section className="container my-5">
        <div className="row g-4 text-center">
          <div className="col-6 col-md-3">
            <div className="bg-white p-3 rounded-3 shadow-sm border h-100">
              <i className="bi bi-bus-front fs-2 text-primary"></i>
              <h4 className="fw-bold text-dark mt-2 mb-0">9,200+</h4>
              <span className="text-muted small">Daily Fleet Buses</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white p-3 rounded-3 shadow-sm border h-100">
              <i className="bi bi-geo-alt-fill fs-2 text-danger"></i>
              <h4 className="fw-bold text-dark mt-2 mb-0">3,600+</h4>
              <span className="text-muted small">Intercity Routes</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white p-3 rounded-3 shadow-sm border h-100">
              <i className="bi bi-people-fill fs-2 text-success"></i>
              <h4 className="fw-bold text-dark mt-2 mb-0">35 Lakhs+</h4>
              <span className="text-muted small">Passengers Daily</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white p-3 rounded-3 shadow-sm border h-100">
              <i className="bi bi-clock-history fs-2 text-warning"></i>
              <h4 className="fw-bold text-dark mt-2 mb-0">98.2%</h4>
              <span className="text-muted small">On-Time Punctuality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge bg-primary-subtle text-primary mb-1">HIGH FREQUENCY</span>
            <h3 className="fw-bold text-dark mb-0">Popular Routes from Hyderabad</h3>
            <p className="text-muted small mb-0">Direct express buses departing round the clock with flexible boarding points.</p>
          </div>
          <Link to="/search" className="btn btn-outline-primary btn-sm d-none d-md-inline-flex align-items-center gap-1">
            View All Routes <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="row g-3">
          {popularRoutes.map((r) => (
            <div key={r.id} className="col-lg-3 col-md-6">
              <div
                className="route-card h-100 d-flex flex-column justify-content-between"
                onClick={() => handleRouteClick(r.source, r.destination)}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary-subtle text-dark small">{r.frequency}</span>
                    <span className="text-danger fw-bold">From ₹{r.startingFare}</span>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">
                    {r.source} &rarr; {r.destination}
                  </h6>
                  <div className="text-muted small">
                    <i className="bi bi-hourglass-split me-1"></i> {r.duration} &bull; {r.distanceKm} km
                  </div>
                </div>
                <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center text-primary small fw-semibold">
                  <span>Book Seats</span>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bus Service Categories */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger-subtle text-danger mb-1">FLEET EXCELLENCE</span>
            <h3 className="fw-bold text-dark mb-1">TGSRTC Bus Service Classes</h3>
            <p className="text-muted small max-w-600 mx-auto">
              Choose from budget village transit to high-speed multi-axle luxury coaches tailored for your travel comfort.
            </p>
          </div>

          <div className="row g-4">
            {serviceCategories.map((cat, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="service-card shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className={`service-badge ${cat.badgeColor}`}>{cat.title}</span>
                    <i className={`bi ${cat.icon} fs-4 text-primary`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-1">{cat.type}</h5>
                  <p className="text-muted small flex-grow-1">{cat.description}</p>
                  <button
                    className="btn btn-outline-primary btn-sm w-100 mt-2"
                    onClick={() => {
                      setSearchParams((prev) => ({ ...prev, from: 'Hyderabad (MGBS)', to: 'Vijayawada' }));
                      navigate('/search');
                    }}
                  >
                    Check Availability <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
{/* Government Welfare & Special Schemes Banner */}
<section className="container my-5">
  <div
    className="p-4 p-md-5 rounded-4 shadow-sm"
    style={{
      background: "linear-gradient(135deg, #EAF4FF 0%, #D6E9FF 100%)",
      border: "1px solid #C6DFFF",
      color: "#102A70",
    }}
  >
    <div className="row align-items-center g-4">
      {/* Left Content */}
      <div className="col-lg-8">
        <span
          className="badge rounded-pill px-3 py-2 fw-bold text-uppercase mb-3"
          style={{
            backgroundColor: "#FFC107",
            color: "#102A70",
            letterSpacing: "0.4px",
          }}
        >
          <i className="bi bi-megaphone-fill me-2"></i>
          Public Welfare Initiative
        </span>

        <h2
          className="fw-bold mb-3"
          style={{ color: "#102A70", lineHeight: "1.25" }}
        >
          Maha Lakshmi Scheme (Free Bus Travel for Women)
        </h2>

        <p
          className="mb-4"
          style={{
            color: "#34547D",
            fontSize: "1.05rem",
            lineHeight: "1.8",
          }}
        >
          Government of Telangana provides 100% free travel for all girl
          students, women, and transgender persons of Telangana domicile
          in TGSRTC Pallevelugu, Express, City Ordinary, and Metro Express
          buses anywhere within the state borders.
        </p>

        <div className="d-flex flex-wrap gap-3">
          <Link
            to="/bus-pass"
            className="btn fw-bold px-4 py-3"
            style={{
              backgroundColor: "#FFC107",
              color: "#102A70",
              border: "1px solid #FFC107",
              borderRadius: "10px",
            }}
          >
            <i className="bi bi-card-checklist me-2"></i>
            Scheme Guidelines
          </Link>

          <Link
            to="/faqs"
            className="btn fw-semibold px-4 py-3"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#102A70",
              border: "1px solid #B8D5F5",
              borderRadius: "10px",
            }}
          >
            <i className="bi bi-question-circle me-2"></i>
            Scheme FAQs
          </Link>
        </div>
      </div>

      {/* Right Information Card */}
      <div className="col-lg-4">
        <div
          className="p-4 p-md-5 text-center h-100 rounded-4"
          style={{
            backgroundColor: "#F5FAFF",
            border: "1px solid #B8D9FF",
            boxShadow: "0 6px 20px rgba(16, 42, 112, 0.06)",
          }}
        >
          <i
            className="bi bi-gender-female d-block mb-3"
            style={{ fontSize: "4.5rem", color: "#F5AD00" }}
          ></i>

          <h4 className="fw-bold mb-2" style={{ color: "#102A70" }}>
            Zero Fare Ticket
          </h4>

          <p
            className="mb-0"
            style={{ color: "#49668D", lineHeight: "1.7" }}
          >
            Carry valid State Aadhaar / Residence card during your journey.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Why Travel With TGSRTC */}
      <section className="container my-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark mb-1">Why Travel with TGSRTC?</h3>
          <p className="text-muted small">The government passenger transport corporation you can always trust.</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 border shadow-sm h-100">
              <i className="bi bi-shield-lock-fill fs-2 text-primary mb-3 d-inline-block"></i>
              <h5 className="fw-bold text-dark">Safety First</h5>
              <p className="text-secondary small mb-0">
                Highly experienced corporation drivers with rigorous training, continuous speed monitoring, and regular maintenance checks.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 border shadow-sm h-100">
              <i className="bi bi-wallet2 fs-2 text-success mb-3 d-inline-block"></i>
              <h5 className="fw-bold text-dark">Zero Hidden Charges</h5>
              <p className="text-secondary small mb-0">
                Transparent government approved fares without surge pricing during festival rushes, weekends, or severe weather conditions.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 border shadow-sm h-100">
              <i className="bi bi-arrow-repeat fs-2 text-danger mb-3 d-inline-block"></i>
              <h5 className="fw-bold text-dark">Instant Refunds & Support</h5>
              <p className="text-secondary small mb-0">
                Official automated cancellation rules with direct refunds to your bank account and 24x7 phone support at 040-69440000.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
