import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Clubs.css";

function Clubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [category, setCategory] = useState("all");

  function joinClub(clubName) {

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const clubKey = "joinedClubs_" + currentUser.email;

  let joinedClubs =
    JSON.parse(localStorage.getItem(clubKey)) || [];

  if (joinedClubs.includes(clubName)) {
    alert("You have already joined this club.");
    return;
  }

  joinedClubs.push(clubName);

  localStorage.setItem(
    clubKey,
    JSON.stringify(joinedClubs)
  );

  alert("Successfully joined " + clubName);

  window.location.reload();
}

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const savedClubs =
  JSON.parse(localStorage.getItem("clubs")) || [];

  

setClubs(savedClubs);

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const clubKey = "joinedClubs_" + currentUser.email;

    let joinedClubs =
      JSON.parse(localStorage.getItem(clubKey)) || [];

    const joinedCount = document.getElementById("joinedCount");
    const joinedText = document.getElementById("joinedText");

    function updateCounter() {
      joinedCount.textContent = joinedClubs.length;

      joinedText.textContent =
        joinedClubs.length === 1
          ? "1 Club"
          : `${joinedClubs.length} Clubs`;
    }

    updateCounter();

    // Search

    const searchInput = document.getElementById("searchClub");
    const clubCards = document.querySelectorAll(".club-card");

    searchInput.addEventListener("keyup", () => {
      const value = searchInput.value.toLowerCase();

      clubCards.forEach((card) => {
        const club = card
          .querySelector("h3")
          .textContent.toLowerCase();

        card.style.display =
          club.includes(value) ? "block" : "none";
      });
    });

  }, [navigate]);

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2>CampusCore</h2>

        <ul>

          <li><Link to="/dashboard">Dashboard</Link></li>

          <li><Link to="/profile">Profile</Link></li>

          <li><Link to="/clubs" className="active">Clubs</Link></li>

          <li><Link to="/events">Events</Link></li>

          <li><a href="#">Marketplace</a></li>

          <li><a href="#">Announcements</a></li>

          <li><a href="#">Maintenance</a></li>

          <li><Link to="/">Logout</Link></li>

        </ul>

      </aside>

      <main className="main-content">

        <section className="clubs-hero">

          <h1>🏛 Student Clubs</h1>

          <p>
            Join clubs, develop new skills, meet fellow students and
            make the most of your university experience.
          </p>

        </section>

        <section className="clubs-summary">

          <div className="summary-card">

            <h3>Joined Clubs</h3>

            <h1 id="joinedCount">0</h1>

            <p>
              You're currently a member of
              <span id="joinedText"> 0 Clubs</span>
            </p>

          </div>

        </section>

        <div className="club-search">

          <input
            type="text"
            id="searchClub"
            placeholder="Search for a club..."
          />

        </div>

        <div className="club-filters">

          <button
className={category==="all" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("all")}
>
All
</button>

          <button
className={category==="academic" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("academic")}
>
Academic
</button>

          <button
className={category==="technology" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("technology")}
>
Technology
</button>

          <button
className={category==="sports" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("sports")}
>
Sports
</button>

          <button
className={category==="entertainment" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("entertainment")}
>
Entertainment
</button>

          <button
className={category==="leadership" ? "filter-btn active" : "filter-btn"}
onClick={()=>setCategory("leadership")}
>
Leadership
</button>

        </div>
        <div className="clubs-grid">

{clubs
.filter(club =>
  category === "all" ||
  club.category.toLowerCase() === category
)
.map((club) => (

<div
key={club.id}
className="club-card"
data-category={club.category.toLowerCase()}
>

<h3>{club.name}</h3>

<span>{club.members}</span>

<p>{club.description}</p>

<div className="club-buttons">

<Link
to={`/club-details?id=${club.id}`}
className="details-btn"
>
View Club
</Link>

<button
  className="join-btn"
  onClick={() => joinClub(club.name)}
>
  Join
</button>

</div>

</div>

))}

</div>

<footer className="clubs-footer">

<p>
© 2026 CampusCore | Student Clubs
</p>

</footer>

</main>

</div>

);
}

export default Clubs;