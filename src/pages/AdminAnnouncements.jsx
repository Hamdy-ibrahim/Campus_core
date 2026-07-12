import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminAnnouncements() {

  const [announcements, setAnnouncements] = useState([]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    priority: ""
  });

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("announcements")) || [

        {
          id:1,
          title:"Semester Registration",
          category:"Academic",
          description:"Semester registration closes this Friday.",
          date:"20 July 2026",
          priority:"High"
        },

        {
          id:2,
          title:"Innovation Fair",
          category:"Events",
          description:"Students are invited to showcase projects.",
          date:"25 July 2026",
          priority:"Medium"
        }

      ];

    localStorage.setItem(
      "announcements",
      JSON.stringify(saved)
    );

    setAnnouncements(saved);

  }, []);

  function addAnnouncement(){

    if(
      !newAnnouncement.title ||
      !newAnnouncement.category ||
      !newAnnouncement.description ||
      !newAnnouncement.date ||
      !newAnnouncement.priority
    ){

      alert("Please fill all fields.");

      return;

    }

    const updated=[

      ...announcements,

      {
        id:Date.now(),
        ...newAnnouncement
      }

    ];

    setAnnouncements(updated);

    localStorage.setItem(
      "announcements",
      JSON.stringify(updated)
    );

    setNewAnnouncement({
      title:"",
      category:"",
      description:"",
      date:"",
      priority:""
    });

  }

  function deleteAnnouncement(id){

    if(!window.confirm("Delete this announcement?")) return;

    const updated=announcements.filter(
      announcement=>announcement.id!==id
    );

    setAnnouncements(updated);

    localStorage.setItem(
      "announcements",
      JSON.stringify(updated)
    );

  }

  return(

<div className="admin-page">

<AdminSidebar/>

<div className="admin-content">

<h1>Announcement Management</h1>

<div className="admin-form">

<input
type="text"
placeholder="Announcement Title"
value={newAnnouncement.title}
onChange={(e)=>
setNewAnnouncement({
...newAnnouncement,
title:e.target.value
})
}
/>

<select
value={newAnnouncement.category}
onChange={(e)=>
setNewAnnouncement({
...newAnnouncement,
category:e.target.value
})
}
>

<option value="">Category</option>
<option>Academic</option>
<option>Events</option>
<option>Library</option>
<option>Sports</option>
<option>General</option>

</select>

<input
type="text"
placeholder="Date"
value={newAnnouncement.date}
onChange={(e)=>
setNewAnnouncement({
...newAnnouncement,
date:e.target.value
})
}
/>

<select
value={newAnnouncement.priority}
onChange={(e)=>
setNewAnnouncement({
...newAnnouncement,
priority:e.target.value
})
}
>

<option value="">Priority</option>
<option>High</option>
<option>Medium</option>
<option>Low</option>

</select>

<textarea
placeholder="Announcement Description"
rows="4"
value={newAnnouncement.description}
onChange={(e)=>
setNewAnnouncement({
...newAnnouncement,
description:e.target.value
})
}
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

{announcements.map((announcement)=>(

<tr key={announcement.id}>

<td>{announcement.title}</td>

<td>{announcement.category}</td>

<td>{announcement.date}</td>

<td>{announcement.priority}</td>

<td>

<button
className="delete-btn"
onClick={()=>deleteAnnouncement(announcement.id)}
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

export default AdminAnnouncements;