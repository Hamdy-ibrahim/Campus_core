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

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("events")) || [

        {
          id:1,
          title:"Hackathon 2026",
          date:"20 July 2026",
          location:"ICT Lab",
          category:"Technology"
        },

        {
          id:2,
          title:"Career Fair",
          date:"25 July 2026",
          location:"Main Hall",
          category:"Career"
        }

      ];

    localStorage.setItem(
      "events",
      JSON.stringify(saved)
    );

    setEvents(saved);

  }, []);

  function addEvent(){

    if(
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.location ||
      !newEvent.category
    ){
      alert("Please fill all fields.");
      return;
    }

    const updated=[
      ...events,
      {
        id:Date.now(),
        ...newEvent
      }
    ];

    setEvents(updated);

    localStorage.setItem(
      "events",
      JSON.stringify(updated)
    );

    setNewEvent({
      title:"",
      date:"",
      location:"",
      category:""
    });

  }

  function deleteEvent(id){

    if(!window.confirm("Delete this event?")) return;

    const updated=events.filter(
      event=>event.id!==id
    );

    setEvents(updated);

    localStorage.setItem(
      "events",
      JSON.stringify(updated)
    );

  }

  return(

<div className="admin-page">

<AdminSidebar/>

<div className="admin-content">

<h1>Event Management</h1>

<div className="admin-form">

<input
type="text"
placeholder="Event Title"
value={newEvent.title}
onChange={(e)=>
setNewEvent({
...newEvent,
title:e.target.value
})
}
/>

<input
type="text"
placeholder="Date"
value={newEvent.date}
onChange={(e)=>
setNewEvent({
...newEvent,
date:e.target.value
})
}
/>

<input
type="text"
placeholder="Location"
value={newEvent.location}
onChange={(e)=>
setNewEvent({
...newEvent,
location:e.target.value
})
}
/>

<select
value={newEvent.category}
onChange={(e)=>
setNewEvent({
...newEvent,
category:e.target.value
})
}
>

<option value="">Category</option>
<option>Technology</option>
<option>Career</option>
<option>Sports</option>
<option>Academic</option>
<option>Entertainment</option>

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

{events.map((event)=>(

<tr key={event.id}>

<td>{event.title}</td>

<td>{event.date}</td>

<td>{event.location}</td>

<td>{event.category}</td>

<td>

<button
className="delete-btn"
onClick={()=>deleteEvent(event.id)}
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