import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function AdminDashboard(){

const students =
JSON.parse(localStorage.getItem("users")) || [];

const announcements =
JSON.parse(localStorage.getItem("announcements")) || [];

const marketplace =
JSON.parse(localStorage.getItem("marketplaceItems")) || [];

const clubs =
JSON.parse(localStorage.getItem("clubs")) || [];

const events =
JSON.parse(localStorage.getItem("events")) || [];



const navigate = useNavigate();

return(

<div className="dashboard">

<AdminSidebar/>

<main className="main-content">

<div className="dashboard-header">

<div>

<h1>Administrator Dashboard</h1>

<p>

Manage CampusCore from one place.

</p>

</div>

</div>

<div className="dashboard-cards">

<div className="dashboard-card">
<h3>Students</h3>
<h1>{students.length}</h1>
</div>

<div className="dashboard-card">
<h3>Clubs</h3>
<h1>{clubs.length}</h1>
</div>

<div className="dashboard-card">
<h3>Events</h3>
<h1>{events.length}</h1>
</div>

<div className="dashboard-card">
<h3>Marketplace</h3>
<h1>{marketplace.length}</h1>
</div>

<div className="dashboard-card">
<h3>Announcements</h3>
<h1>{announcements.length}</h1>
</div>

</div>

<div className="dashboard-grid">

<div className="recent">

<h2>📊 System Overview</h2>

<ul>

<li>👨‍🎓 Registered Students: {students.length}</li>

<li>🏛 Active Clubs: {clubs.length}</li>

<li>📅 Upcoming Events: {events.length}</li>

<li>🛒 Marketplace Listings: {marketplace.length}</li>

<li>📢 Announcements Posted: {announcements.length}</li>
</ul>

</div>

<div className="recent">

<h2>⚡ Quick Actions</h2>

<div className="quick-actions">

<button onClick={() => navigate("/admin/clubs")}>
Create Club
</button>

<button onClick={() => navigate("/admin/events")}>
Create Event
</button>

<button onClick={() => navigate("/admin/announcements")}>
Post Announcement
</button>

</div>

</div>

</div>

</main>

</div>

);

}

export default AdminDashboard;