import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("users")) || [];

    setStudents(saved);

  }, []);

  function deleteStudent(email) {

    if (!window.confirm("Delete this student?")) return;

    const updated = students.filter(
      (student) => student.email !== email
    );

    setStudents(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

  }

  const filteredStudents = students.filter((student) =>

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

            <h1>👨‍🎓 Students Management</h1>

            <p>
              View and manage all registered students.
            </p>

          </div>

        </div>

        <div className="admin-cards">

          <div className="admin-card">

            <h4>Total Students</h4>

            <h1>{students.length}</h1>

          </div>

          <div className="admin-card">

            <h4>Courses</h4>

            <h1>
              {
                [...new Set(students.map(s => s.course))]
                  .length
              }
            </h1>

          </div>

          <div className="admin-card">

            <h4>Academic Years</h4>

            <h1>
              {
                [...new Set(students.map(s => s.year))]
                  .length
              }
            </h1>

          </div>

        </div>

        <input

          className="admin-search"

          type="text"

          placeholder="🔍 Search student..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

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

            {filteredStudents.length === 0 ? (

              <tr>

                <td colSpan="5">

                  No students found.

                </td>

              </tr>

            ) : (

              filteredStudents.map((student,index)=>(

                <tr key={index}>

                  <td>{student.fullname}</td>

                  <td>{student.email}</td>

                  <td>{student.course}</td>

                  <td>{student.year}</td>

                  <td>

                    <button

                      className="delete-btn"

                      onClick={()=>
                        deleteStudent(student.email)
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