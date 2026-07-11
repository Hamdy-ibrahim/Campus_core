import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import "../styles/events.css";

function Events() {

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const eventKey = currentUser
  ? "registeredEvents_" + currentUser.email
  : "registeredEvents_guest";

const [search, setSearch] = useState("");

const [registeredEvents, setRegisteredEvents] = useState([]);

useEffect(() => {

const saved = JSON.parse(localStorage.getItem(eventKey)) || [];

setRegisteredEvents(saved);

}, [eventKey]);

const events = [

{
id:1,
title:"Campus Hackathon 2026",
category:"technology",
date:"20 Aug",
time:"9:00 AM",
location:"ICT Innovation Centre",
description:"Build innovative software solutions with students across campus."
},

{
id:2,
title:"AI Workshop",
category:"technology",
date:"24 Aug",
time:"2:00 PM",
location:"Computer Lab",
description:"Learn Artificial Intelligence using Python."
},

{
id:3,
title:"Career Fair",
category:"career",
date:"30 Aug",
time:"10:00 AM",
location:"Main Hall",
description:"Meet employers and internship recruiters."
},

{
id:4,
title:"CV Writing Workshop",
category:"career",
date:"2 Sep",
time:"11:00 AM",
location:"Conference Room",
description:"Improve your CV with HR professionals."
},

{
id:5,
title:"Interfaculty Football Tournament",
category:"sports",
date:"8 Sep",
time:"9:00 AM",
location:"Sports Grounds",
description:"Support your faculty in the annual football tournament."
},

{
id:6,
title:"Freshers Talent Show",
category:"entertainment",
date:"15 Sep",
time:"6:00 PM",
location:"Auditorium",
description:"Music, dance, comedy and performances from students."
}

];

const filteredEvents = events.filter(event =>
event.title.toLowerCase().includes(search.toLowerCase())
);

function registerEvent(eventTitle){

if(registeredEvents.includes(eventTitle)){

alert("You have already registered for this event.");

return;

}

const updatedEvents = [...registeredEvents,eventTitle];

setRegisteredEvents(updatedEvents);

localStorage.setItem(

eventKey,

JSON.stringify(updatedEvents)

);

alert("Successfully registered!");

}

return (

<div className="dashboard">

<Sidebar />

<main className="main-content">

<section className="events-hero">

<h1>📅 Campus Events</h1>

<p>

Discover workshops, hackathons, sports,
career fairs and university activities.

</p>

</section>

<section className="events-summary">

<div className="summary-card">

<h3>Registered Events</h3>

<h1>{registeredEvents.length}</h1>

<p>

You're registered for {registeredEvents.length} event{registeredEvents.length!==1 && "s"}

</p>

</div>

</section>

<div className="event-search">

<input

type="text"

placeholder="Search events..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="events-grid">

{filteredEvents.map(event=>(

<div className="event-card" key={event.id}>

<h3>{event.title}</h3>

<span>{event.date}</span>

<p>{event.description}</p>

<div className="event-info">

<p>🕒 {event.time}</p>

<p>📍 {event.location}</p>

</div>

<div className="event-buttons">

<Link

to={`/event-details/${event.id}`}

className="details-btn"

>

View Event

</Link>

<button

className="register-btn"

onClick={()=>registerEvent(event.title)}

disabled={registeredEvents.includes(event.title)}

>

{registeredEvents.includes(event.title)

? "✓ Registered"

: "Register"}

</button>

</div>

</div>

))}

</div>

</main>

</div>

);

}

export default Events;