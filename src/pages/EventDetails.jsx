import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/events.css";

function EventDetails() {

const { id } = useParams();

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const eventKey = currentUser
? "registeredEvents_" + currentUser.email
: "registeredEvents_guest";

const events =
JSON.parse(localStorage.getItem("events")) || [];

const event = events.find(
e => e.id === Number(id)
);
if (!event) {
  return <h2>Event not found.</h2>;
}

function register(){

let registered =
JSON.parse(localStorage.getItem(eventKey)) || [];

if(registered.includes(event.title)){

alert("Already registered.");

return;

}

registered.push(event.title);

localStorage.setItem(

eventKey,

JSON.stringify(registered)

);

alert("Successfully Registered!");

}

return(

<div className="dashboard">

<Sidebar/>

<main className="main-content">

<button

className="back-btn"

onClick={()=>window.history.back()}

>

← Back to Events

</button>

<div className="club-header">

<div>

<span className="club-tag">

{event.category}

</span>

<h1>

{event.title}

</h1>

<p>

{event.description}

</p>

</div>

<button

className="join-big-btn"

onClick={register}

>

Register

</button>

</div>

<div className="club-stats">

<div>

<h2>{event.date}</h2>

<p>Date</p>

</div>

<div>

<h2>{event.time}</h2>

<p>Time</p>

</div>

<div>

<h2>{event.venue}</h2>

<p>Venue</p>

</div>

<div>

<h2>{event.organizer}</h2>

<p>Organizer</p>

</div>

</div>

<div className="details-grid">

<div>

<div className="detail-card">

<h2>About Event</h2>

<p>{event.description}</p>

</div>

<div className="detail-card">

<h2>Requirements</h2>

<ul>

{event.requirements.map((item,index)=>(

<li key={index}>{item}</li>

))}

</ul>

</div>

</div>

<div>

<div className="detail-card">

<h2>Event Schedule</h2>

<ul>

{event.schedule.map((item,index)=>(

<li key={index}>{item}</li>

))}

</ul>

</div>

</div>

</div>

</main>

</div>

);

}

export default EventDetails;