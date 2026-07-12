import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminClubs() {

  const [clubs, setClubs] = useState([]);

  const [newClub, setNewClub] = useState({
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
});

  useEffect(() => {

    const saved =
JSON.parse(localStorage.getItem("clubs")) || [];

    localStorage.setItem(
      "clubs",
      JSON.stringify(saved)
    );

    setClubs(saved);

  }, []);

  function addClub(){

    if(!newClub.name || !newClub.category){

      alert("Fill all fields.");

      return;

    }

    const updated=[

      ...clubs,

      {
        id:Date.now(),
        ...newClub
      }

    ];

    setClubs(updated);

    localStorage.setItem(
      "clubs",
      JSON.stringify(updated)
    );

    setNewClub({
name:"",
category:"",
description:"",
members:"",
meeting:"",
venue:"",
president:"",
vicePresident:"",
secretary:"",
founded:"",
projects:"",
rating:"",
requirements:"",
activities:""
});

  }

  function deleteClub(id){

    if(!window.confirm("Delete this club?")) return;

    const updated=clubs.filter(
      club=>club.id!==id
    );

    setClubs(updated);

    localStorage.setItem(
      "clubs",
      JSON.stringify(updated)
    );

  }

  return(


<div className="admin-page">

    <AdminSidebar />

<div className="admin-content">

<h1>Club Management</h1>

<div className="admin-form">

<input
type="text"
placeholder="Club Name"
value={newClub.name}
onChange={(e)=>
setNewClub({
...newClub,
name:e.target.value
})
}
/>

<select
value={newClub.category}
onChange={(e)=>
setNewClub({
...newClub,
category:e.target.value
})
}
>

<option value="">Category</option>
<option>Academic</option>
<option>Technology</option>
<option>Sports</option>
<option>Entertainment</option>
<option>Leadership</option>

</select>

<textarea
placeholder="Description"
value={newClub.description}
onChange={(e)=>
setNewClub({
...newClub,
description:e.target.value
})
}
/>

<input
type="text"
placeholder="Members (e.g. 145 Members)"
value={newClub.members}
onChange={(e)=>
setNewClub({
...newClub,
members:e.target.value
})
}
/>

<input
type="text"
placeholder="Meeting Day"
value={newClub.meeting}
onChange={(e)=>
setNewClub({
...newClub,
meeting:e.target.value
})
}
/>

<input
type="text"
placeholder="Venue"
value={newClub.venue}
onChange={(e)=>
setNewClub({
...newClub,
venue:e.target.value
})
}
/>

<input
type="text"
placeholder="President"
value={newClub.president}
onChange={(e)=>
setNewClub({
...newClub,
president:e.target.value
})
}
/>

<input
type="text"
placeholder="Vice President"
value={newClub.vicePresident}
onChange={(e)=>
setNewClub({
...newClub,
vicePresident:e.target.value
})
}
/>

<input
type="text"
placeholder="Secretary"
value={newClub.secretary}
onChange={(e)=>
setNewClub({
...newClub,
secretary:e.target.value
})
}
/>

<input
type="text"
placeholder="Founded Year"
value={newClub.founded}
onChange={(e)=>
setNewClub({
...newClub,
founded:e.target.value
})
}
/>

<input
type="text"
placeholder="Projects Completed"
value={newClub.projects}
onChange={(e)=>
setNewClub({
...newClub,
projects:e.target.value
})
}
/>

<input
type="text"
placeholder="Club Rating (e.g. 4.9)"
value={newClub.rating}
onChange={(e)=>
setNewClub({
...newClub,
rating:e.target.value
})
}
/>

<textarea
placeholder="Membership Requirements"
value={newClub.requirements}
onChange={(e)=>
setNewClub({
...newClub,
requirements:e.target.value
})
}
/>

<input
type="text"
placeholder="Activities (comma separated)"
value={newClub.activities}
onChange={(e)=>
setNewClub({
...newClub,
activities:e.target.value
})
}
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

{clubs.map((club)=>(

<tr key={club.id}>

<td>{club.name}</td>

<td>{club.category}</td>

<td>

<button
className="delete-btn"
onClick={()=>deleteClub(club.id)}
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