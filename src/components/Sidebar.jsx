import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("loggedInUser");

    navigate("/login");

  }

  return (

    <aside className="sidebar">

      <h2>CampusCore</h2>

      <ul>

        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/profile">Profile</Link></li>

        <li><Link to="/clubs">Clubs</Link></li>

        <li><Link to="/events">Events</Link></li>

        <li><Link to="/marketplace">Marketplace</Link></li>

        <li><Link to="/announcements">Announcements</Link></li>

        <li><Link to="/maintenance">Maintenance</Link></li>

        <li>
  <Link
    to="/login"
    onClick={() => localStorage.removeItem("loggedInUser")}
  >
    Logout
  </Link>
</li>

      </ul>

    </aside>

  );

}

export default Sidebar;