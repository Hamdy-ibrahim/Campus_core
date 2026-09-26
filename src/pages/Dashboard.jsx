import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [clubCount, setClubCount] = useState(0);

  const [eventCount, setEventCount] = useState(0);

  const [greeting, setGreeting] = useState("");

  const [marketCount, setMarketCount] = useState(0);

  const [announcementCount, setAnnouncementCount] = useState(0);

  const [announcements, setAnnouncements] = useState([]);

  const [events, setEvents] = useState([]);


  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!currentUser) {

      alert("Please login first.");

      navigate("/login");

      return;

    }

    setUser(currentUser);


    // ================================
    // LOAD CLUB MEMBERSHIPS
    // ================================

    fetch(
      `http://localhost:5000/api/clubs/memberships/user/${currentUser.id}`
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load club memberships"
          );
        }

        return res.json();

      })
      .then(data => {

        setClubCount(data.length);

      })
      .catch(err => {

        console.error(
          "Failed to load club memberships:",
          err
        );

      });


    // ================================
    // LOAD EVENT REGISTRATIONS
    // ================================

    fetch(
      `http://localhost:5000/api/events/registrations/user/${currentUser.id}`
    )
      .then(res => {

        if (!res.ok) {
          throw new Error(
            "Failed to load event registrations"
          );
        }

        return res.json();

      })
      .then(data => {

        setEventCount(data.length);

        setEvents(data);

      })
      .catch(err => {

        console.error(
          "Failed to load event registrations:",
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

        setMarketCount(data.length);

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

        setAnnouncementCount(
          data.length
        );

      })
      .catch(err => {

        console.error(
          "Failed to load announcements:",
          err
        );

      });


    // ================================
    // GREETING
    // ================================

    const hour =
      new Date().getHours();

    if (hour < 12) {

      setGreeting("Good Morning");

    } else if (hour < 18) {

      setGreeting("Good Afternoon");

    } else {

      setGreeting("Good Evening");

    }

  }, [navigate]);


  if (!user) return null;


  return (

    <div className="dashboard">


      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN */}

      <main className="main-content">


        <div className="dashboard-header">

          <div>

            <h1>

              {greeting}, {user.fullname} 👋

            </h1>

            <p>

              Ready for another productive day on campus?

            </p>

          </div>

        </div>


        <h2 className="dashboard-title">

          Today's Overview

        </h2>


        <div className="dashboard-cards">


          {/* CLUBS */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/clubs")
            }
          >

            <i className="fa-solid fa-users"></i>

            <h3>
              My Clubs
            </h3>

            <h1>
              {clubCount}
            </h1>

          </div>


          {/* EVENTS */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/events")
            }
          >

            <i className="fa-solid fa-calendar-days"></i>

            <h3>
              Events
            </h3>

            <h1>
              {eventCount}
            </h1>

          </div>


          {/* MARKETPLACE */}

          <div className="dashboard-card">

            <i className="fa-solid fa-store"></i>

            <h3>
              Marketplace
            </h3>

            <h1>
              {marketCount}
            </h1>

          </div>


          {/* ANNOUNCEMENTS */}

          <div className="dashboard-card">

            <i className="fa-solid fa-bullhorn"></i>

            <h3>
              Announcements
            </h3>

            <h1>
              {announcementCount}
            </h1>

          </div>


        </div>


        <div className="dashboard-grid">


          {/* UPCOMING EVENTS */}

          <div className="recent">

            <h2>
              📅 Upcoming Events
            </h2>

            <ul>

              {eventCount === 0 ? (

                <li>
                  No upcoming events registered.
                </li>

              ) : (

                events.map((event) => (

                  <li
                    key={event.eventId}
                  >
                    {event.title}
                  </li>

                ))

              )}

            </ul>

          </div>


          {/* LATEST ANNOUNCEMENTS */}

          <div className="recent">

            <h2>
              📢 Latest Announcements
            </h2>

            <ul>

              {announcements.length === 0 ? (

                <li>
                  No announcements available.
                </li>

              ) : (

                announcements
                  .slice(0, 5)
                  .map(announcement => (

                    <li
                      key={announcement.id}
                    >

                      📢 {announcement.title}

                    </li>

                  ))

              )}

            </ul>

          </div>


        </div>


        {/* QUICK ACTIONS */}

        <div className="recent">

          <h2>
            ⚡ Quick Actions
          </h2>

          <div className="quick-actions">


            <button
              onClick={() =>
                navigate("/clubs")
              }
            >
              Browse Clubs
            </button>


            <button
              onClick={() =>
                navigate("/events")
              }
            >
              View Events
            </button>


            <button
              onClick={() =>
                navigate("/profile")
              }
            >
              My Profile
            </button>


            <button
              onClick={() =>
                navigate("/marketplace")
              }
            >
              Marketplace
            </button>


          </div>

        </div>


      </main>

    </div>

  );

}

export default Dashboard;