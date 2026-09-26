import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/events.css";

function EventDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [event, setEvent] = useState(null);

  const [registered, setRegistered] = useState(false);


  // Check whether the current user is already registered
  useEffect(() => {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    async function checkRegistration() {

      try {

        const response = await fetch(
          `http://localhost:5000/api/events/registrations/user/${currentUser.id}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch registrations"
          );
        }

        const registrations =
          await response.json();

        const alreadyRegistered =
          registrations.some(
            registration =>
              registration.eventId === Number(id)
          );

        setRegistered(alreadyRegistered);

      } catch (error) {

        console.error(error);

      }

    }

    checkRegistration();

  }, [id, navigate, currentUser?.id]);


  // Load the selected event from the backend
  useEffect(() => {

    async function fetchEvent() {

      try {

        const response = await fetch(
          `http://localhost:5000/api/events/${id}`
        );

        if (!response.ok) {

          if (response.status === 404) {
            throw new Error("Event not found");
          }

          throw new Error(
            "Failed to fetch event"
          );

        }

        const data =
          await response.json();

        setEvent(data);

      } catch (error) {

        console.error(error);

        setEvent(null);

      }

    }

    fetchEvent();

  }, [id]);


  // Register for this event
  async function register() {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (registered) {

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

      setRegistered(true);

      alert(
        "Successfully Registered!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to the server."
      );

    }

  }


  // Wait while the event is being loaded
  if (event === null) {

    return (
      <div className="dashboard">

        <Sidebar />

        <main className="main-content">

          <h2>Loading event...</h2>

        </main>

      </div>
    );

  }


  return (

    <div className="dashboard">

      <Sidebar />

      <main className="main-content">


        <button
          className="back-btn"
          onClick={() => window.history.back()}
        >
          ← Back to Events
        </button>


        <div className="club-header">

          <div>

            <span className="club-tag">
              {event.category}
            </span>

            <h1>
              {event.title}
            </h1>

            <p>
              {event.description}
            </p>

          </div>


          <button
            className="join-big-btn"
            onClick={register}
            disabled={registered}
          >
            {registered
              ? "✓ Registered"
              : "Register"
            }
          </button>

        </div>


        <div className="club-stats">


          <div>

            <h2>
              {event.date}
            </h2>

            <p>Date</p>

          </div>


          <div>

            <h2>
              {event.time || "Not specified"}
            </h2>

            <p>Time</p>

          </div>


          <div>

            <h2>
              {event.venue || event.location}
            </h2>

            <p>Venue</p>

          </div>


          <div>

            <h2>
              {event.organizer || "Not specified"}
            </h2>

            <p>Organizer</p>

          </div>


        </div>


        <div className="details-grid">


          <div>

            <div className="detail-card">

              <h2>About Event</h2>

              <p>
                {event.description ||
                  "No description available."
                }
              </p>

            </div>


            <div className="detail-card">

              <h2>Requirements</h2>

              {event.requirements &&
              event.requirements.length > 0 ? (

                <ul>

                  {event.requirements.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p>
                  No requirements specified.
                </p>

              )}

            </div>

          </div>


          <div>

            <div className="detail-card">

              <h2>Event Schedule</h2>

              {event.schedule &&
              event.schedule.length > 0 ? (

                <ul>

                  {event.schedule.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p>
                  No schedule available.
                </p>

              )}

            </div>

          </div>


        </div>

      </main>

    </div>

  );

}

export default EventDetails;