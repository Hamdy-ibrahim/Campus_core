import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminMaintenance() {

  const [requests, setRequests] = useState([]);

  // Get all maintenance requests
  useEffect(() => {

    fetch("http://localhost:5000/api/maintenance")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
      })
      .catch(err => {
        console.error(
          "Failed to load maintenance requests:",
          err
        );
      });

  }, []);

  // Update request status
  async function updateStatus(id, newStatus) {

    try {

      const response = await fetch(
        `http://localhost:5000/api/maintenance/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data.error ||
          "Failed to update status."
        );

        return;
      }

      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id
            ? {
                ...request,
                status: data.status
              }
            : request
        )
      );

    } catch (err) {

      console.error(err);

      alert(
        "Could not connect to the server."
      );

    }

  }

  // Delete request
  async function deleteRequest(id) {

    if (!window.confirm("Delete this request?")) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/maintenance/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data.error ||
          "Failed to delete request."
        );

        return;
      }

      setRequests(prevRequests =>
        prevRequests.filter(
          request => request.id !== id
        )
      );

    } catch (err) {

      console.error(err);

      alert(
        "Could not connect to the server."
      );

    }

  }

  return (

    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-content">

        <h1>
          Maintenance Requests
        </h1>

        <table className="admin-table">

          <thead>

            <tr>

              <th>
                Student
              </th>

              <th>
                Location
              </th>

              <th>
                Category
              </th>

              <th>
                Description
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map(request => (

              <tr key={request.id}>

                <td>
                  {request.student}
                </td>

                <td>
                  {request.location}
                </td>

                <td>
                  {request.category}
                </td>

                <td>
                  {request.description}
                </td>

                <td>

                  <select
                    value={request.status}
                    onChange={(e) =>
                      updateStatus(
                        request.id,
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteRequest(request.id)
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

export default AdminMaintenance;