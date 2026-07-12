import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminMaintenance() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    let allRequests = [];

    users.forEach(user => {

      const userRequests =
        JSON.parse(
          localStorage.getItem(
            "maintenance_" + user.email
          )
        ) || [];

      userRequests.forEach(request => {

        allRequests.push({

          ...request,

          student: user.fullname,

          email: user.email

        });

      });

    });

    setRequests(allRequests);

  }, []);

  function updateStatus(id,newStatus){

    const updated=requests.map(request=>{

      if(request.id===id){

        const studentRequests=
          JSON.parse(
            localStorage.getItem(
              "maintenance_"+request.email
            )
          ) || [];

        const updatedStudent=studentRequests.map(r=>

          r.id===id

          ? {...r,status:newStatus}

          : r

        );

        localStorage.setItem(

          "maintenance_"+request.email,

          JSON.stringify(updatedStudent)

        );

        return{

          ...request,

          status:newStatus

        };

      }

      return request;

    });

    setRequests(updated);

  }

  function deleteRequest(id,email){

    if(!window.confirm("Delete this request?")) return;

    const updatedStudent=

      (
        JSON.parse(
          localStorage.getItem(
            "maintenance_"+email
          )
        ) || []
      ).filter(r=>r.id!==id);

    localStorage.setItem(

      "maintenance_"+email,

      JSON.stringify(updatedStudent)

    );

    setRequests(

      requests.filter(r=>r.id!==id)

    );

  }

  return(

<div className="admin-page">

<AdminSidebar/>

<div className="admin-content">

<h1>Maintenance Requests</h1>

<table className="admin-table">

<thead>

<tr>

<th>Student</th>

<th>Location</th>

<th>Category</th>

<th>Description</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{requests.map(request=>(

<tr key={request.id}>

<td>{request.student}</td>

<td>{request.location}</td>

<td>{request.category}</td>

<td>{request.description}</td>

<td>

<select

value={request.status}

onChange={(e)=>

updateStatus(

request.id,

e.target.value

)

}

>

<option>Pending</option>

<option>In Progress</option>

<option>Completed</option>

</select>

</td>

<td>

<button

className="delete-btn"

onClick={()=>

deleteRequest(

request.id,

request.email

)

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