import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [marketItems, setMarketItems] = useState([]);
const [requests, setRequests] = useState([]);

  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!currentUser) {

      alert("Please login first.");

      navigate("/login");

      return;

    }

    setUser(currentUser);

    const joinedClubs =
JSON.parse(
localStorage.getItem(
"joinedClubs_" + currentUser.email
)
) || [];

const allClubs =
JSON.parse(localStorage.getItem("clubs")) || [];

const validJoinedClubs = joinedClubs.filter(joinedClub =>
allClubs.some(club => club.name === joinedClub)
);

localStorage.setItem(
"joinedClubs_" + currentUser.email,
JSON.stringify(validJoinedClubs)
);

setClubs(validJoinedClubs);

// Load registered events
const registeredEvents = JSON.parse(
  localStorage.getItem(
    "registeredEvents_" + currentUser.email
  )
) || [];

setEvents(registeredEvents);

const items = JSON.parse(
localStorage.getItem("marketplaceItems")
) || [];

setMarketItems(items);

const maintenance = JSON.parse(
localStorage.getItem(
"maintenance_" + currentUser.email
)
) || [];

setRequests(maintenance);

}, [navigate]);


  function logout() {

    localStorage.removeItem("loggedInUser");

    navigate("/login");

  }

  if (!user) return null;

  return (

<div className="dashboard">


<Sidebar />

{/* ================= MAIN ================= */}

<main className="main-content">

<div className="profile-header">

<div>

<h1>My Profile</h1>

<p>

Manage your CampusCore account and campus activities.

</p>

</div>
</div>

<div className="profile-card">

<div className="profile-top">

<div className="profile-avatar">

<i className="fa-solid fa-user-graduate"></i>

</div>

<div>

<h2>{user.fullname}</h2>

<p>

{user.course} • {user.year}

</p>

</div>

</div>

{/* PERSONAL INFO */}

<div className="profile-section">

<h3>Personal Information</h3>

<div className="profile-grid">

<div className="info-box">

<span>Student ID</span>

<h4>{user.studentid}</h4>

</div>

<div className="info-box">

<span>Email</span>

<h4>{user.email}</h4>

</div>

<div className="info-box">

<span>Course</span>

<h4>{user.course}</h4>

</div>

<div className="info-box">

<span>Academic Year</span>

<h4>{user.year}</h4>

</div>

</div>

</div>

{/* CAMPUS ACTIVITY */}

<div className="profile-section">

<h3>Campus Activity</h3>

<div className="profile-grid">

<div className="info-box">

<span>Joined Clubs</span>

<h2>{clubs.length}</h2>

</div>

<div className="info-box">

<span>Events Joined</span>

<h2>{events.length}</h2>

</div>

<div className="info-box">

<span>Marketplace Listings</span>

<h2>{marketItems.length}</h2>

</div>

<div className="info-box">

<span>Maintenance Requests</span>

<h2>{requests.length}</h2>

</div>

</div>

</div>

{/* MY CLUBS */}

<div className="profile-section">

<h3>My Clubs</h3>

<ul className="activity-list">

{clubs.length === 0 ? (

<li>You haven't joined any clubs yet.</li>

) : (

clubs.map((club,index)=>(

<li key={index}>

✓ {club}

</li>

))

)}

</ul>

</div>
<div className="profile-section">

<h3>My Events</h3>

<ul className="activity-list">

{events.length === 0 ? (

<li>You haven't registered for any events.</li>

) : (

events.map((event,index)=>(

<li key={index}>
📅 {event}
</li>

))

)}

</ul>

</div>

{/* RECENT */}

<div className="profile-section">

<h3>Recent Activity</h3>

<ul className="activity-list">

<li>🎉 Welcome to CampusCore.</li>

<li>📅 Keep joining clubs and events.</li>

<li>🛒 Marketplace activity will appear here.</li>

<li>🛠 Maintenance requests will appear here.</li>

</ul>

</div>

<div className="profile-buttons">

<button
className="secondary"
onClick={()=>navigate("/dashboard")}
>

<i className="fa-solid fa-arrow-left"></i>

Back to Dashboard

</button>

</div>

</div>

</main>

</div>

  );

}

export default Profile;