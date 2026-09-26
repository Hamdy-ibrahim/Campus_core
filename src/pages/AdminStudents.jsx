import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  // Load students from MySQL through API
  useEffect(() => {

    fetch("http://localhost:5000/api/signup")
      .then(res => res.json())
      .then(data => {

        setStudents(data);
        setLoading(false);

      })
      .catch(err => {

        console.error(
          "Failed to load students:",
          err
        );

        setLoading(false);

      });

  }, []);


  // Delete student from MySQL
  async function deleteStudent(id) {

    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/signup/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();


      if (!response.ok) {

        alert(
          data.error ||
          "Failed to delete student."
        );

        return;
      }


      // Remove student from page
      setStudents(prevStudents =>
        prevStudents.filter(
          student => student.id !== id
        )
      );


    } catch (err) {

      console.error(err);

      alert(
        "Could not connect to the server."
      );

    }
  }


  // Search students
  const filteredStudents = students.filter(
    student =>

      student.fullname
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.email
        .toLowerCase()
        .includes(search.toLowerCase())

  );


  return (

    <div className="dashboard">

      <AdminSidebar />

      <main className="main-content">

        <div className="admin-header">

          <div>

            <h1>
              👨‍🎓 Students Management
            </h1>

            <p>
              View and manage all registered students.
            </p>

          </div>

        </div>


        <div className="admin-cards">

          <div className="admin-card">

            <h4>Total Students</h4>

            <h1>
              {students.length}
            </h1>

          </div>


          <div className="admin-card">

            <h4>Courses</h4>

            <h1>
              {
                [
                  ...new Set(
                    students.map(
                      student => student.course
                    )
                  )
                ].length
              }
            </h1>

          </div>


          <div className="admin-card">

            <h4>Academic Years</h4>

            <h1>
              {
                [
                  ...new Set(
                    students.map(
                      student => student.year
                    )
                  )
                ].length
              }
            </h1>

          </div>

        </div>


        <input

          className="admin-search"

          type="text"

          placeholder="🔍 Search student..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />


        <table className="admin-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Course</th>

              <th>Year</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>

                <td colSpan="5">

                  Loading students...

                </td>

              </tr>

            ) : filteredStudents.length === 0 ? (

              <tr>

                <td colSpan="5">

                  No students found.

                </td>

              </tr>

            ) : (

              filteredStudents.map(student => (

                <tr key={student.id}>

                  <td>
                    {student.fullname}
                  </td>

                  <td>
                    {student.email}
                  </td>

                  <td>
                    {student.course}
                  </td>

                  <td>
                    {student.year}
                  </td>

                  <td>

                    <button

                      className="delete-btn"

                      onClick={() =>
                        deleteStudent(student.id)
                      }

                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </main>

    </div>

  );

}

export default AdminStudents;