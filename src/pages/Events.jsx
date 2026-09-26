import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/events.css";

function Events() {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [search, setSearch] = useState("");

  const [registeredEvents, setRegisteredEvents] = useState([]);

  const [events, setEvents] = useState([]);


  // Load events and user's registrations from MySQL
  useEffect(() => {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    async function loadData() {

      try {

        // Load all events
        const eventsResponse = await fetch(
          "http://localhost:5000/api/events"
        );

        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventsData =
          await eventsResponse.json();

        setEvents(eventsData);


        // Load this user's registered events
        const registrationResponse = await fetch(
          `http://localhost:5000/api/events/registrations/user/${currentUser.id}`
        );

        if (!registrationResponse.ok) {
          throw new Error(
            "Failed to fetch registrations"
          );
        }

        const registrationData =
          await registrationResponse.json();

        setRegisteredEvents(registrationData);

      } catch (error) {

        console.error(error);

        alert(
          "Could not load events from the server."
        );

      }

    }

    loadData();

  }, [navigate, currentUser?.id]);


  // Search events
  const filteredEvents = events.filter(event =>
    event.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // Check whether user is registered for an event
  function isRegistered(eventId) {

    return registeredEvents.some(
      registration =>
        registration.eventId === eventId
    );

  }


  // Register for an event
  async function registerEvent(event) {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (isRegistered(event.id)) {

      alert(
        "You have already registered for this event."
      );

      return;

    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/events/${event.id}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: currentUser.id
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.error ||
          "Failed to register for event."
        );

        return;

      }


      // Add the registration to the page immediately
      setRegisteredEvents(prev => [
        ...prev,
        {
          eventId: event.id,
          title: event.title,
          date: event.date,
          location: event.location,
          category: event.category
        }
      ]);


      alert(
        "Successfully registered!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to the server."
      );

    }

  }


  return (

    <div className="dashboard">

      <Sidebar />

      <main className="main-content">


        <section className="events-hero">

          <h1>📅 Campus Events</h1>

          <p>
            Discover workshops, hackathons, sports,
            career fairs and university activities.
          </p>

        </section>


        <section className="events-summary">

          <div className="summary-card">

            <h3>Registered Events</h3>

            <h1>{registeredEvents.length}</h1>

            <p>

              You're registered for{" "}
              {registeredEvents.length} event
              {registeredEvents.length !== 1 && "s"}

            </p>

          </div>

        </section>


        <div className="event-search">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="events-grid">

          {filteredEvents.map(event => (

            <div
              className="event-card"
              key={event.id}
            >

              <h3>
                {event.title}
              </h3>

              <span>
                {event.date}
              </span>

              <p>
                {event.description}
              </p>

              <div className="event-info">

                <p>
                  🕒 {event.time}
                </p>

                <p>
                  📍 {event.location}
                </p>

              </div>


              <div className="event-buttons">

                <Link
                  to={`/event-details/${event.id}`}
                  className="details-btn"
                >
                  View Event
                </Link>


                <button
                  className="register-btn"
                  onClick={() =>
                    registerEvent(event)
                  }
                  disabled={isRegistered(event.id)}
                >

                  {isRegistered(event.id)
                    ? "✓ Registered"
                    : "Register"
                  }

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>

  );

}

export default Events;