import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [clubCount, setClubCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [marketCount, setMarketCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

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

    const joined = JSON.parse(

      localStorage.getItem(
        "joinedClubs_" + currentUser.email
      )

    ) || [];

    setClubCount(joined.length);
    const registeredEvents = JSON.parse(
localStorage.getItem(
"registeredEvents_" + currentUser.email
)
) || [];

setEvents(registeredEvents);

setEventCount(registeredEvents.length);



const items = JSON.parse(
localStorage.getItem("marketplaceItems")
) || [];

setMarketCount(items.length);

const savedAnnouncements = JSON.parse(
  localStorage.getItem("announcements")
) || [];

setAnnouncements(savedAnnouncements);

setAnnouncementCount(savedAnnouncements.length);

    const hour = new Date().getHours();

    if (hour < 12) {

      setGreeting("Good Morning");

    } else if (hour < 18) {

      setGreeting("Good Afternoon");

    } else {

      setGreeting("Good Evening");

    }

  }, [navigate]);

  function logout() {

    localStorage.removeItem("loggedInUser");

    navigate("/login");

  }

  if (!user) return null;

  return (

<div className="dashboard">

{/* SIDEBAR */}

<Sidebar />

{/* MAIN */}

<main className="main-content">

<div className="dashboard-header">

<div>

<h1>

{greeting}, {user.fullname} 👋

</h1>

<p>

Ready for another productive day on campus?

</p>

</div>

<div className="notification-card">

<i className="fa-solid fa-bell"></i>

<span>3 New Notifications</span>

</div>

</div>

<h2 className="dashboard-title">

Today's Overview

</h2>

<div className="dashboard-cards">

<div
className="dashboard-card"
onClick={()=>navigate("/clubs")}
>

<i className="fa-solid fa-users"></i>

<h3>My Clubs</h3>

<h1>{clubCount}</h1>

</div>

<div
className="dashboard-card"
onClick={()=>navigate("/events")}
>

<i className="fa-solid fa-calendar-days"></i>

<h3>Events</h3>

<h1>{eventCount}</h1>

</div>

<div className="dashboard-card">

<i className="fa-solid fa-store"></i>

<h3>Marketplace</h3>

<h1>{marketCount}</h1>

</div>

<div className="dashboard-card">

<i className="fa-solid fa-bullhorn"></i>

<h3>Announcements</h3>

<h1>{announcementCount}</h1>

</div>

</div>

<div className="dashboard-grid">

<div className="recent">

<h2>📅 Upcoming Events</h2>

<ul>

{eventCount === 0 ? (

<li>No upcoming events registered.</li>

) : (

events.map((event,index)=>(

<li key={index}>

📅 {event}

</li>

))

)}

</ul>

</div>

<div className="recent">

<h2>📢 Latest Announcements</h2>

<ul>

{announcements.length === 0 ? (

    <li>No announcements available.</li>

) : (

    announcements.slice(0,5).map((announcement,index)=>(

        <li key={index}>

            📢 {announcement.title}

        </li>

    ))

)}

</ul>

</div>

</div>

<div className="recent">

<h2>⚡ Quick Actions</h2>

<div className="quick-actions">

<button onClick={()=>navigate("/clubs")}>

Browse Clubs

</button>

<button onClick={()=>navigate("/events")}>

View Events

</button>

<button onClick={()=>navigate("/profile")}>

My Profile

</button>

<button onClick={()=>navigate("/marketplace")}>

Marketplace

</button>

</div>

</div>

</main>

</div>

  );

}

export default Dashboard;