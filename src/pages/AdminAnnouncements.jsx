import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminAnnouncements() {

  const emptyAnnouncement = {
    title: "",
    category: "",
    description: "",
    date: "",
    priority: ""
  };

  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] =
    useState(emptyAnnouncement);


  // GET announcements from API
  useEffect(() => {

    async function fetchAnnouncements() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/announcements"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }

        const data = await response.json();

        setAnnouncements(data);

      } catch (error) {

        console.error(error);

        alert(
          "Could not load announcements from the server."
        );

      }

    }

    fetchAnnouncements();

  }, []);


  // Handle form changes
  function handleChange(e) {

    setNewAnnouncement({
      ...newAnnouncement,
      [e.target.name]: e.target.value
    });

  }


  // Add announcement
  async function addAnnouncement() {

    if (
      !newAnnouncement.title ||
      !newAnnouncement.category ||
      !newAnnouncement.description ||
      !newAnnouncement.date ||
      !newAnnouncement.priority
    ) {

      alert("Please fill all fields.");

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:5000/api/announcements",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newAnnouncement)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.error || "Failed to add announcement."
        );

        return;

      }


      setAnnouncements([
        ...announcements,
        data
      ]);


      setNewAnnouncement(emptyAnnouncement);


      alert("Announcement added successfully!");


    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  // Delete announcement
  async function deleteAnnouncement(id) {

    if (
      !window.confirm(
        "Delete this announcement?"
      )
    ) {

      return;

    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/announcements/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.error ||
          "Failed to delete announcement."
        );

        return;

      }


      setAnnouncements(
        announcements.filter(
          announcement =>
            announcement.id !== id
        )
      );


      alert(
        "Announcement deleted successfully!"
      );


    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  return (

    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Announcement Management</h1>


        <div className="admin-form">

          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={newAnnouncement.title}
            onChange={handleChange}
          />


          <select
            name="category"
            value={newAnnouncement.category}
            onChange={handleChange}
          >

            <option value="">
              Category
            </option>

            <option>Academic</option>

            <option>Events</option>

            <option>Library</option>

            <option>Sports</option>

            <option>General</option>

          </select>


          <input
            type="text"
            name="date"
            placeholder="Date"
            value={newAnnouncement.date}
            onChange={handleChange}
          />


          <select
            name="priority"
            value={newAnnouncement.priority}
            onChange={handleChange}
          >

            <option value="">
              Priority
            </option>

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>


          <textarea
            name="description"
            placeholder="Announcement Description"
            rows="4"
            value={newAnnouncement.description}
            onChange={handleChange}
          />


          <button onClick={addAnnouncement}>
            Add Announcement
          </button>

        </div>


        <table className="admin-table">

          <thead>

            <tr>

              <th>Title</th>

              <th>Category</th>

              <th>Date</th>

              <th>Priority</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {announcements.map(
              (announcement) => (

                <tr key={announcement.id}>

                  <td>
                    {announcement.title}
                  </td>

                  <td>
                    {announcement.category}
                  </td>

                  <td>
                    {announcement.date}
                  </td>

                  <td>
                    {announcement.priority}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteAnnouncement(
                          announcement.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminAnnouncements;