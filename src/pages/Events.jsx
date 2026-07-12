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

const [events, setEvents] = useState([]);

useEffect(() => {

const savedEvents =
JSON.parse(localStorage.getItem("events")) || [];

setEvents(savedEvents);

const savedRegistered =
JSON.parse(localStorage.getItem(eventKey)) || [];

setRegisteredEvents(savedRegistered);

}, [eventKey]);

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