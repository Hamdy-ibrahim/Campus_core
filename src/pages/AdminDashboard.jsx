import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {

    // ================================
    // LOAD STUDENTS
    // ================================

    fetch(
      "http://localhost:5000/api/signup"
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load students"
          );
        }

        return res.json();

      })
      .then(data => {

        setStudents(data);

      })
      .catch(err => {

        console.error(
          "Failed to load students:",
          err
        );

      });


    // ================================
    // LOAD CLUBS
    // ================================

    fetch(
      "http://localhost:5000/api/clubs"
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load clubs"
          );
        }

        return res.json();

      })
      .then(data => {

        setClubs(data);

      })
      .catch(err => {

        console.error(
          "Failed to load clubs:",
          err
        );

      });


    // ================================
    // LOAD EVENTS
    // ================================

    fetch(
      "http://localhost:5000/api/events"
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load events"
          );
        }

        return res.json();

      })
      .then(data => {

        setEvents(data);

      })
      .catch(err => {

        console.error(
          "Failed to load events:",
          err
        );

      });


    // ================================
    // LOAD MARKETPLACE
    // ================================

    fetch(
      "http://localhost:5000/api/marketplace"
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load marketplace"
          );
        }

        return res.json();

      })
      .then(data => {

        setMarketplace(data);

      })
      .catch(err => {

        console.error(
          "Failed to load marketplace:",
          err
        );

      });


    // ================================
    // LOAD ANNOUNCEMENTS
    // ================================

    fetch(
      "http://localhost:5000/api/announcements"
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load announcements"
          );
        }

        return res.json();

      })
      .then(data => {

        setAnnouncements(data);

      })
      .catch(err => {

        console.error(
          "Failed to load announcements:",
          err
        );

      });

  }, []);


  return (

    <div className="dashboard">

      <AdminSidebar />

      <main className="main-content">

        <div className="dashboard-header">

          <div>

            <h1>
              Administrator Dashboard
            </h1>

            <p>
              Manage CampusCore from one place.
            </p>

          </div>

        </div>


        <div className="dashboard-cards">


          <div className="dashboard-card">

            <h3>
              Students
            </h3>

            <h1>
              {students.length}
            </h1>

          </div>


          <div className="dashboard-card">

            <h3>
              Clubs
            </h3>

            <h1>
              {clubs.length}
            </h1>

          </div>


          <div className="dashboard-card">

            <h3>
              Events
            </h3>

            <h1>
              {events.length}
            </h1>

          </div>


          <div className="dashboard-card">

            <h3>
              Marketplace
            </h3>

            <h1>
              {marketplace.length}
            </h1>

          </div>


          <div className="dashboard-card">

            <h3>
              Announcements
            </h3>

            <h1>
              {announcements.length}
            </h1>

          </div>


        </div>


        <div className="dashboard-grid">


          <div className="recent">

            <h2>
              📊 System Overview
            </h2>

            <ul>

              <li>
                👨‍🎓 Registered Students: {students.length}
              </li>

              <li>
                🏛 Active Clubs: {clubs.length}
              </li>

              <li>
                📅 Upcoming Events: {events.length}
              </li>

              <li>
                🛒 Marketplace Listings: {marketplace.length}
              </li>

              <li>
                📢 Announcements Posted: {announcements.length}
              </li>

            </ul>

          </div>


          <div className="recent">

            <h2>
              ⚡ Quick Actions
            </h2>

            <div className="quick-actions">

              <button
                onClick={() =>
                  navigate("/admin/clubs")
                }
              >
                Create Club
              </button>

              <button
                onClick={() =>
                  navigate("/admin/events")
                }
              >
                Create Event
              </button>

              <button
                onClick={() =>
                  navigate("/admin/announcements")
                }
              >
                Post Announcement
              </button>

            </div>

          </div>


        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;