
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminEvents() {

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    category: ""
  });

  // Load events from the database when the page opens
  useEffect(() => {

    async function fetchEvents() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data);

      } catch (error) {

        console.error(error);

        alert("Could not load events from the server.");

      }

    }

    fetchEvents();

  }, []);


  // Handle changes in the Add Event form
  function handleChange(e) {

    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });

  }


  // Add a new event to MySQL through the API
  async function addEvent() {

    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.location ||
      !newEvent.category
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newEvent)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.error || "Failed to add event.");

        return;

      }

      // Add the newly created event to the page
      setEvents([
        ...events,
        data
      ]);

      // Clear the form
      setNewEvent({
        title: "",
        date: "",
        location: "",
        category: ""
      });

      alert("Event added successfully!");

    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  // Delete an event from MySQL through the API
  async function deleteEvent(id) {

    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.error || "Failed to delete event.");

        return;

      }

      // Remove the deleted event from the page
      setEvents(
        events.filter(event => event.id !== id)
      );

      alert("Event deleted successfully!");

    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  return (

    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Event Management</h1>


        <div className="admin-form">

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
          />


          <input
            type="text"
            name="date"
            placeholder="Date"
            value={newEvent.date}
            onChange={handleChange}
          />


          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleChange}
          />


          <select
            name="category"
            value={newEvent.category}
            onChange={handleChange}
          >

            <option value="">
              Category
            </option>

            <option>
              Technology
            </option>

            <option>
              Career
            </option>

            <option>
              Sports
            </option>

            <option>
              Academic
            </option>

            <option>
              Entertainment
            </option>

          </select>


          <button onClick={addEvent}>
            Add Event
          </button>

        </div>


        <table className="admin-table">

          <thead>

            <tr>

              <th>Title</th>

              <th>Date</th>

              <th>Location</th>

              <th>Category</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {events.map((event) => (

              <tr key={event.id}>

                <td>
                  {event.title}
                </td>

                <td>
                  {event.date}
                </td>

                <td>
                  {event.location}
                </td>

                <td>
                  {event.category}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminEvents;
