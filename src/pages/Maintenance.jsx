import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function Maintenance() {

const currentUser = JSON.parse(
localStorage.getItem("loggedInUser")
);

const requestKey =
currentUser
? "maintenance_" + currentUser.email
: "maintenance_guest";

const [requests,setRequests] = useState([]);

const [form,setForm] = useState({

title:"",
category:"",
location:"",
priority:"",
description:""

});

useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem(requestKey)) || [];

setRequests(saved);

},[]);

function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}

function submitRequest(e){

e.preventDefault();

const newRequest={

id:Date.now(),

...form,

status:"Pending"

};

const updated=[...requests,newRequest];

setRequests(updated);

localStorage.setItem(

requestKey,

JSON.stringify(updated)

);

setForm({

title:"",
category:"",
location:"",
priority:"",
description:""

});

alert("Maintenance request submitted successfully.");

}

return(

<div className="dashboard">

<Sidebar/>

<main className="main-content">

<section className="maintenance-header">

<h1>🛠 Maintenance Requests</h1>

<p>

Report damaged facilities or maintenance issues around campus.

</p>

</section>

<div className="maintenance-container">

<div className="maintenance-form">

<h2>New Request</h2>

<form onSubmit={submitRequest}>

<input

type="text"

name="title"

placeholder="Issue Title"

value={form.title}

onChange={handleChange}

required

/>

<select

name="category"

value={form.category}

onChange={handleChange}

required

>

<option value="">Select Category</option>

<option>Electrical</option>

<option>Plumbing</option>

<option>Furniture</option>

<option>Cleaning</option>

<option>Internet/WiFi</option>

<option>Other</option>

</select>

<input

type="text"

name="location"

placeholder="Location"

value={form.location}

onChange={handleChange}

required

/>

<select

name="priority"

value={form.priority}

onChange={handleChange}

required

>

<option value="">Priority</option>

<option>Low</option>

<option>Medium</option>

<option>High</option>

</select>

<textarea

name="description"

placeholder="Describe the issue"

rows="5"

value={form.description}

onChange={handleChange}

required

/>

<button type="submit">

Submit Request

</button>

</form>

</div>

<div className="maintenance-list">

<h2>My Requests</h2>

{
requests.length===0?

<p>No maintenance requests yet.</p>

:

requests.map(request=>(

<div
className="request-card"
key={request.id}
>

<h3>{request.title}</h3>

<p>

<strong>Category:</strong>

{request.category}

</p>

<p>

<strong>Location:</strong>

{request.location}

</p>

<p>

<strong>Priority:</strong>

{request.priority}

</p>

<p>

<strong>Status:</strong>

<span className="status">

{request.status}

</span>

</p>

<p>{request.description}</p>

</div>

))

}

</div>

</div>

</main>

</div>

);

}

export default Maintenance;