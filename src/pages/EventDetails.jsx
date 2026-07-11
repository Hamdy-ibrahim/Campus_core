import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/events.css";

function EventDetails() {

const { id } = useParams();

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const eventKey = currentUser
? "registeredEvents_" + currentUser.email
: "registeredEvents_guest";

const events = {

1:{
title:"Campus Hackathon 2026",
category:"Technology",
date:"20 August 2026",
time:"9:00 AM",
venue:"ICT Innovation Centre",
organizer:"Programming Club",
description:"Join students from different faculties to build innovative software solutions, compete for prizes and network with industry professionals.",
requirements:[
"Laptop",
"Student ID",
"Basic programming knowledge"
],
schedule:[
"Opening Ceremony",
"Team Formation",
"Hackathon Begins",
"Presentation",
"Awards"
]
},

2:{
title:"AI Workshop",
category:"Technology",
date:"24 August 2026",
time:"2:00 PM",
venue:"Computer Lab",
organizer:"Programming Club",
description:"Learn Artificial Intelligence fundamentals using Python and machine learning.",
requirements:[
"Laptop",
"Python Installed",
"Student ID"
],
schedule:[
"Introduction",
"Hands-on Coding",
"Machine Learning Demo",
"Q&A"
]
},

3:{
title:"Career Fair",
category:"Career",
date:"30 August 2026",
time:"10:00 AM",
venue:"Main Hall",
organizer:"Career Office",
description:"Meet employers, submit your CV and discover internship opportunities.",
requirements:[
"Printed CV",
"Student ID"
],
schedule:[
"Company Exhibitions",
"CV Review",
"Interviews",
"Networking"
]
},

4:{
title:"CV Writing Workshop",
category:"Career",
date:"2 September 2026",
time:"11:00 AM",
venue:"Conference Room",
organizer:"Career Office",
description:"Improve your CV with HR professionals and receive interview tips.",
requirements:[
"Laptop",
"Existing CV"
],
schedule:[
"CV Review",
"Writing Session",
"Interview Tips"
]
},

5:{
title:"Interfaculty Football Tournament",
category:"Sports",
date:"8 September 2026",
time:"9:00 AM",
venue:"Sports Grounds",
organizer:"Sports Department",
description:"Support your faculty and compete for the university football championship.",
requirements:[
"Sports Kit",
"Student ID"
],
schedule:[
"Opening Match",
"Semi Finals",
"Final Match"
]
},

6:{
title:"Freshers Talent Show",
category:"Entertainment",
date:"15 September 2026",
time:"6:00 PM",
venue:"Auditorium",
organizer:"Student Council",
description:"Enjoy music, comedy, poetry and dance performances from fellow students.",
requirements:[
"Student ID"
],
schedule:[
"Opening",
"Performances",
"Awards"
]
}

};

const event = events[id];

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