import { Link } from "react-router-dom";

import heroImage from "../assets/images/hero-students.png.jpg";
import campusImage from "../assets/images/campus.png.jpg";

import "../styles/home.css";

function Home() {
  return (
    <>

      {/* ==========================
          NAVBAR
      =========================== */}

      <header>

        <nav className="navbar">

          <Link to="/" className="logo">

            <i className="fa-solid fa-graduation-cap"></i>

            <span>CampusCore</span>

          </Link>

          <ul className="nav-links">

            <li><a href="#">Home</a></li>

            <li><a href="#about">About</a></li>

            <li><a href="#features">Features</a></li>

            <li><a href="#events">Events</a></li>

            <li><a href="#contact">Contact</a></li>

          </ul>

          <div className="nav-buttons">

            <Link to="/login" className="login-btn">

              Login

            </Link>

            <Link to="/signup" className="signup-btn">

              Get Started

            </Link>

          </div>

        </nav>

      </header>

      {/* ==========================
          HERO
      =========================== */}

      <section className="hero">

        <div className="hero-left">

          <span className="hero-badge">

            🎓 #1 Student Experience Platform

          </span>

          <h1>

            Everything a Student Needs,

            <span> One Platform.</span>

          </h1>

          <p>

            CampusCore helps university students discover clubs,
            join campus events, receive announcements,
            buy & sell items, report maintenance issues
            and stay connected with campus life—all in one place.

          </p>

          <div className="hero-buttons">

            <Link to="/signup" className="primary-btn">

              Get Started

            </Link>

            <a href="#features" className="secondary-btn">

              Explore Features

            </a>

          </div>

          <div className="hero-stats">

            <div className="stat-box">

              <h2>5000+</h2>

              <p>Students</p>

            </div>

            <div className="stat-box">

              <h2>120+</h2>

              <p>Student Clubs</p>

            </div>

            <div className="stat-box">

              <h2>350+</h2>

              <p>Campus Events</p>

            </div>

            <div className="stat-box">

              <h2>98%</h2>

              <p>Satisfaction</p>

            </div>

          </div>

        </div>

        <div className="hero-right">

          <img

            src={heroImage}

            alt="Students"

          />

        </div>

      </section>

      {/* ==========================
          ABOUT
      =========================== */}

      <section className="about" id="about">

        <div className="about-image">

          <img

            src={campusImage}

            alt="Campus"

          />

        </div>

        <div className="about-content">

          <span className="section-tag">

            ABOUT CAMPUSCORE

          </span>

          <h2>

            Everything You Need To

            Enjoy Campus Life

          </h2>

          <p>

            CampusCore is an all-in-one university platform designed
            to simplify student life. Whether you're looking for clubs,
            events, campus announcements, accommodation support,
            marketplace listings or maintenance services,
            CampusCore keeps everything in one place.

          </p>

          <div className="about-list">

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Student Clubs & Communities

            </div>

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Campus Events

            </div>

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Student Marketplace

            </div>

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Maintenance Requests

            </div>

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Official Announcements

            </div>

            <div>

              <i className="fa-solid fa-circle-check"></i>

              Personal Student Dashboard

            </div>

          </div>

          <Link

            to="/signup"

            className="primary-btn"

          >

            Join CampusCore

          </Link>

        </div>

      </section>
            {/* ==========================
          FEATURES
      =========================== */}

      <section className="features" id="features">

        <span className="section-tag">

          OUR FEATURES

        </span>

        <h2>

          Everything You Need in One Platform

        </h2>

        <p className="section-text">

          CampusCore helps students manage university life from one
          modern and easy-to-use dashboard.

        </p>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-users"></i>

            </div>

            <h3>Student Clubs</h3>

            <p>

              Join academic, technology, sports and social clubs,
              discover new hobbies and connect with students who
              share your interests.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-calendar-days"></i>

            </div>

            <h3>Campus Events</h3>

            <p>

              Never miss workshops, hackathons,
              career fairs, sports tournaments
              or student activities happening on campus.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-store"></i>

            </div>

            <h3>Marketplace</h3>

            <p>

              Buy and sell textbooks,
              electronics,
              furniture and other student essentials safely.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-bullhorn"></i>

            </div>

            <h3>Announcements</h3>

            <p>

              Receive official university updates,
              faculty notices and important academic
              information instantly.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-screwdriver-wrench"></i>

            </div>

            <h3>Maintenance</h3>

            <p>

              Report broken lights,
              internet issues,
              hostel maintenance and track repairs in real time.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-chart-line"></i>

            </div>

            <h3>Student Dashboard</h3>

            <p>

              Monitor your activities,
              joined clubs,
              registered events and campus updates
              from one personalized dashboard.

            </p>

            <Link to="/signup">

              Learn More →

            </Link>

          </div>

        </div>

      </section>

      {/* ==========================
          HOW IT WORKS
      =========================== */}

      <section className="steps">

        <span className="section-tag">

          GETTING STARTED

        </span>

        <h2>

          Start Your Campus Journey
          in 4 Simple Steps

        </h2>

        <p className="section-text">

          Joining CampusCore takes less than a minute.
          Once you're in, everything you need for campus life
          is just a click away.

        </p>

        <div className="step-grid">

          <div className="step-card">

            <div className="step-number">

              01

            </div>

            <i className="fa-solid fa-user-plus"></i>

            <h3>Create an Account</h3>

            <p>

              Register using your university email and
              create your CampusCore profile.

            </p>

          </div>

          <div className="step-card">

            <div className="step-number">

              02

            </div>

            <i className="fa-solid fa-right-to-bracket"></i>

            <h3>Login</h3>

            <p>

              Securely sign in and access your personalized
              student dashboard.

            </p>

          </div>

          <div className="step-card">

            <div className="step-number">

              03

            </div>

            <i className="fa-solid fa-compass"></i>

            <h3>Explore Campus</h3>

            <p>

              Discover clubs, events, announcements,
              and student opportunities.

            </p>

          </div>

          <div className="step-card">

            <div className="step-number">

              04

            </div>

            <i className="fa-solid fa-rocket"></i>

            <h3>Get Involved</h3>

            <p>

              Join clubs, attend events,
              buy & sell items,
              and enjoy campus life.

            </p>

          </div>

        </div>

      </section>

      {/* ==========================
          EVENTS
      =========================== */}

      <section className="events" id="events">

        <span className="section-tag">

          CAMPUS EVENTS

        </span>

        <h2>

          Upcoming Events

        </h2>

        <p className="section-text">

          Join exciting university events, meet new people,
          build your skills and create unforgettable memories.

        </p>

        <div className="event-grid">
                      {/* EVENT 1 */}

          <div className="event-card">

            <div className="event-date">

              <span>20</span>

              <small>AUG</small>

            </div>

            <h3>Tech Innovation Summit</h3>

            <p>

              Discover the latest innovations in AI,
              software engineering and cybersecurity.

            </p>

            <div className="event-info">

              <span>

                <i className="fa-solid fa-clock"></i>

                {" "}9:00 AM

              </span>

              <span>

                <i className="fa-solid fa-location-dot"></i>

                {" "}Main Hall

              </span>

            </div>

            <Link to="/login" className="event-btn">

              View Event

            </Link>

          </div>

          {/* EVENT 2 */}

          <div className="event-card">

            <div className="event-date">

              <span>26</span>

              <small>AUG</small>

            </div>

            <h3>Interfaculty Sports Tournament</h3>

            <p>

              Cheer for your faculty or participate
              in football, basketball and athletics.

            </p>

            <div className="event-info">

              <span>

                <i className="fa-solid fa-clock"></i>

                {" "}10:00 AM

              </span>

              <span>

                <i className="fa-solid fa-location-dot"></i>

                {" "}Sports Grounds

              </span>

            </div>

            <Link to="/login" className="event-btn">

              View Event

            </Link>

          </div>

          {/* EVENT 3 */}

          <div className="event-card">

            <div className="event-date">

              <span>05</span>

              <small>SEP</small>

            </div>

            <h3>Career & Internship Fair</h3>

            <p>

              Meet top employers,
              submit your CV and discover internship opportunities.

            </p>

            <div className="event-info">

              <span>

                <i className="fa-solid fa-clock"></i>

                {" "}8:30 AM

              </span>

              <span>

                <i className="fa-solid fa-location-dot"></i>

                {" "}Conference Centre

              </span>

            </div>

            <Link to="/login" className="event-btn">

              View Event

            </Link>

          </div>

        </div>

      </section>

      {/* ==========================
          TESTIMONIALS
      =========================== */}

      <section className="testimonials">

        <h2>

          What Students Say

        </h2>

        <div className="testimonial-grid">

          <div className="testimonial">

            <p>

              "CampusCore made it much easier to discover clubs and stay updated with university events."

            </p>

            <h4>

              — Computer Science Student

            </h4>

          </div>

          <div className="testimonial">

            <p>

              "The marketplace and maintenance request system are my favourite features."

            </p>

            <h4>

              — Business Student

            </h4>

          </div>

        </div>

      </section>

      {/* ==========================
          FOOTER
      =========================== */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-about">

            <h2>

              <i className="fa-solid fa-graduation-cap"></i>

              {" "}CampusCore

            </h2>

            <p>

              CampusCore is a modern university platform that
              connects students with clubs, events,
              announcements, marketplace services and campus
              activities—all in one place.

            </p>

            <div className="footer-social">

              <a href="#"><i className="fab fa-facebook-f"></i></a>

              <a href="#"><i className="fab fa-instagram"></i></a>

              <a href="#"><i className="fab fa-x-twitter"></i></a>

              <a href="#"><i className="fab fa-linkedin-in"></i></a>

            </div>

          </div>

          <div className="footer-links">

            <h3>Quick Links</h3>

            <a href="#">Home</a>

            <a href="#about">About</a>

            <a href="#features">Features</a>

            <a href="#events">Events</a>

            <Link to="/login">

              Login

            </Link>

          </div>

          <div className="footer-links">

            <h3>Platform</h3>

            <a href="#">Student Clubs</a>

            <a href="#">Marketplace</a>

            <a href="#">Announcements</a>

            <a href="#">Maintenance</a>

            <a href="#">Dashboard</a>

          </div>

          <div className="footer-contact">

  <h3>Project Team</h3>

  <ul className="team-list">

    <li>
      <i className="fa-solid fa-user"></i>
      hamdi.ibrahim@strathmore.edu
    </li>

    <li>
      <i className="fa-solid fa-user"></i>
      naila.njeri@strathmore.edu
    </li>

    <li>
      <i className="fa-solid fa-user"></i>
      raphael.wanga@strathmore.edu
    </li>

    <li>
      <i className="fa-solid fa-user"></i>
      dan.rugendo@strathmore.edu
    </li>

  </ul>

</div>
        </div>

        <hr />

        <div className="footer-bottom">

          <p>

            © 2026 CampusCore. All Rights Reserved.

          </p>

          <div>

            <a href="#">Privacy Policy</a>

            <a href="#">Terms of Service</a>

          </div>

        </div>

      </footer>

    </>

  );

}

export default Home;
        