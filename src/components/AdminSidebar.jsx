import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {

const navigate = useNavigate();

function logout(){

localStorage.removeItem("loggedInUser");

navigate("/login");

}

return(

<aside className="sidebar">

<h2>CampusCore</h2>

<p style={{marginBottom:"25px",color:"#94a3b8"}}>

Administrator

</p>

<ul>

<li>

<Link to="/admin">

🏠 Dashboard

</Link>

</li>

<li>

<Link to="/admin/students">

👨‍🎓 Students

</Link>

</li>

<li>

<Link to="/admin/clubs">

🏛 Clubs

</Link>

</li>

<li>

<Link to="/admin/events">

📅 Events

</Link>

</li>

<li>

<Link to="/admin/announcements">

📢 Announcements

</Link>

</li>

<li>

<Link to="/admin/marketplace">

🛒 Marketplace

</Link>

</li>

<li>

<Link to="/admin/maintenance">

🛠 Maintenance

</Link>

</li>

<li>

<Link className="logout-btn" to="/">
        🚪 Logout
      </Link>

</li>

</ul>

</aside>

);

}

export default AdminSidebar;