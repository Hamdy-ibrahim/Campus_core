import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminClubs() {

  const emptyClub = {
    name: "",
    category: "",
    description: "",
    members: "",
    meeting: "",
    venue: "",
    president: "",
    vicePresident: "",
    secretary: "",
    founded: "",
    projects: "",
    rating: "",
    requirements: "",
    activities: ""
  };


  const [clubs, setClubs] = useState([]);

  const [newClub, setNewClub] = useState(emptyClub);


  // Load clubs from MySQL
  useEffect(() => {

    async function fetchClubs() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/clubs"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const data = await response.json();

        setClubs(data);

      } catch (error) {

        console.error(error);

        alert("Could not load clubs from the server.");

      }

    }

    fetchClubs();

  }, []);


  // Handle form changes
  function handleChange(e) {

    setNewClub({
      ...newClub,
      [e.target.name]: e.target.value
    });

  }


  // Add club to MySQL
  async function addClub() {

    if (!newClub.name || !newClub.category) {

      alert("Club name and category are required.");

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:5000/api/clubs",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newClub)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.error || "Failed to add club.");

        return;

      }


      setClubs([
        ...clubs,
        data
      ]);


      setNewClub(emptyClub);

      alert("Club added successfully!");

    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  // Delete club from MySQL
  async function deleteClub(id) {

    if (!window.confirm("Delete this club?")) {
      return;
    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/clubs/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.error || "Failed to delete club.");

        return;

      }


      setClubs(
        clubs.filter(club => club.id !== id)
      );


      alert("Club deleted successfully!");

    } catch (error) {

      console.error(error);

      alert("Could not reach the server.");

    }

  }


  return (

    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Club Management</h1>


        <div className="admin-form">


          <input
            type="text"
            name="name"
            placeholder="Club Name"
            value={newClub.name}
            onChange={handleChange}
          />


          <select
            name="category"
            value={newClub.category}
            onChange={handleChange}
          >

            <option value="">
              Category
            </option>

            <option>Academic</option>
            <option>Technology</option>
            <option>Sports</option>
            <option>Entertainment</option>
            <option>Leadership</option>

          </select>


          <textarea
            name="description"
            placeholder="Description"
            value={newClub.description}
            onChange={handleChange}
          />


          <input
            type="text"
            name="members"
            placeholder="Members (e.g. 145 Members)"
            value={newClub.members}
            onChange={handleChange}
          />


          <input
            type="text"
            name="meeting"
            placeholder="Meeting Day"
            value={newClub.meeting}
            onChange={handleChange}
          />


          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={newClub.venue}
            onChange={handleChange}
          />


          <input
            type="text"
            name="president"
            placeholder="President"
            value={newClub.president}
            onChange={handleChange}
          />


          <input
            type="text"
            name="vicePresident"
            placeholder="Vice President"
            value={newClub.vicePresident}
            onChange={handleChange}
          />


          <input
            type="text"
            name="secretary"
            placeholder="Secretary"
            value={newClub.secretary}
            onChange={handleChange}
          />


          <input
            type="text"
            name="founded"
            placeholder="Founded Year"
            value={newClub.founded}
            onChange={handleChange}
          />


          <input
            type="text"
            name="projects"
            placeholder="Projects Completed"
            value={newClub.projects}
            onChange={handleChange}
          />


          <input
            type="text"
            name="rating"
            placeholder="Club Rating (e.g. 4.9)"
            value={newClub.rating}
            onChange={handleChange}
          />


          <textarea
            name="requirements"
            placeholder="Membership Requirements"
            value={newClub.requirements}
            onChange={handleChange}
          />


          <input
            type="text"
            name="activities"
            placeholder="Activities (comma separated)"
            value={newClub.activities}
            onChange={handleChange}
          />


          <button onClick={addClub}>
            Add Club
          </button>

        </div>


        <table className="admin-table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Category</th>
              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {clubs.map((club) => (

              <tr key={club.id}>

                <td>
                  {club.name}
                </td>

                <td>
                  {club.category}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteClub(club.id)
                    }
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

export default AdminClubs;

