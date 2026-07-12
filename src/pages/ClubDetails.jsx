import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function ClubDetails() {

const [searchParams] = useSearchParams();

const clubId = Number(searchParams.get("id"));

const clubs =
  JSON.parse(localStorage.getItem("clubs")) || [];

const club = clubs.find(
  (club) => club.id === clubId
);

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const clubKey = currentUser
  ? "joinedClubs_" + currentUser.email
  : "joinedClubs_guest";

const [joined, setJoined] = useState(false);
function joinClub() {

  if (joined) {

    alert("You have already joined this club.");

    return;

  }

  const saved =
    JSON.parse(localStorage.getItem(clubKey)) || [];

  saved.push(club.name);

  localStorage.setItem(
    clubKey,
    JSON.stringify(saved)
  );

  setJoined(true);

  alert("Successfully joined the club!");

}

useEffect(() => {

  if (!club) return;

  const saved =
    JSON.parse(localStorage.getItem(clubKey)) || [];

  setJoined(saved.includes(club.name));

}, [club, clubKey]);

if(!club){

return <h2>Club not found.</h2>;

}
return (

<div className="dashboard">

<Sidebar />

<main className="main-content">

<Link to="/clubs" className="back-btn">

<i className="fa-solid fa-arrow-left"></i>

Back to Clubs

</Link>

<div className="club-header">

<div>

<span className="club-tag">

{club.category}

</span>

<h1>

{club.name}

</h1>

<p>

{club.description}

</p>

</div>

<button
className="join-big-btn"
onClick={joinClub}
disabled={joined}
>

{joined ? "✓ Joined" : "Join Club"}

</button>

</div>

<div className="club-stats">

<div>

<h2>{club.members}</h2>

<p>Members</p>

</div>

<div>

<h2>{club.rating} ⭐</h2>

<p>Rating</p>

</div>

<div>

<h2>{club.meeting}</h2>

<p>Meeting Day</p>

</div>

<div>

<h2>{club.venue}</h2>

<p>Venue</p>

</div>

</div>

<div className="details-grid">

<div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-circle-info"></i>

About the Club

</h2>

<p>

{club.description}

</p>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-code"></i>

Activities

</h2>

<ul className="detail-list">

{club.activities
  ?.split(",")
  .map((activity, index) => (

<li key={index}>

{activity}

</li>

))}

</ul>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-circle-check"></i>

Membership Requirements

</h2>

<ul className="detail-list">

<li>{club.requirements}</li>

</ul>

</div>

</div>
<div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-users"></i>

Club Leadership

</h2>

<div className="leader">

<strong>President</strong>

<span>{club.president}</span>

</div>

<div className="leader">

<strong>Vice President</strong>

<span>{club.vicePresident}</span>

</div>

<div className="leader">

<strong>Secretary</strong>

<span>{club.secretary}</span>

</div>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-chart-line"></i>

Club Statistics

</h2>

<div className="stats-list">

<p>

<strong>Founded:</strong> {club.founded}

</p>

<p>

<strong>Projects Completed:</strong> {club.projects}
</p>

<p>

<strong>Hackathons Won:</strong> 12

</p>

<p>

<strong>Current Members:</strong> {club.members}

</p>

</div>

</div>

</div>

</div>

</main>

</div>

);

}

export default ClubDetails;