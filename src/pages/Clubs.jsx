import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Clubs.css";

function Clubs() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

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

    // Filters

    const filterButtons =
      document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) =>
          btn.classList.remove("active")
        );

        this.classList.add("active");

        const category = this.dataset.category;

        clubCards.forEach((card) => {
          if (
            category === "all" ||
            card.dataset.category === category
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Join Buttons

    const joinButtons =
      document.querySelectorAll(".join-btn");

    joinButtons.forEach((button) => {
      const card = button.closest(".club-card");

      const clubName =
        card.querySelector("h3").textContent;

      if (joinedClubs.includes(clubName)) {
        button.textContent = "✓ Joined";
        button.style.background = "#16a34a";
      }

      button.addEventListener("click", () => {
        if (joinedClubs.includes(clubName)) {
          alert("You have already joined this club.");
          return;
        }

        joinedClubs.push(clubName);

        localStorage.setItem(
          clubKey,
          JSON.stringify(joinedClubs)
        );

        button.textContent = "✓ Joined";
        button.style.background = "#16a34a";

        updateCounter();

        alert("Successfully joined " + clubName);
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

          <button className="filter-btn active" data-category="all">
            All
          </button>

          <button className="filter-btn" data-category="academic">
            Academic
          </button>

          <button className="filter-btn" data-category="technology">
            Technology
          </button>

          <button className="filter-btn" data-category="sports">
            Sports
          </button>

          <button className="filter-btn" data-category="entertainment">
            Entertainment
          </button>

          <button className="filter-btn" data-category="leadership">
            Leadership
          </button>

        </div>
        {/* =========================
    ACADEMIC
========================= */}

<h2 className="category-title">📘 Academic Clubs</h2>

<div className="clubs-grid">

  <div className="club-card" data-category="academic">

    <h3>📐 Mathematics Society</h3>

    <span>84 Members</span>

    <p>
      Weekly problem-solving sessions,
      math competitions and peer tutoring.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=mathematics"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="academic">

    <h3>🎤 Debate Society</h3>

    <span>95 Members</span>

    <p>
      Improve communication,
      confidence and public speaking.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=debate"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="academic">

    <h3>📚 Accounting Club</h3>

    <span>61 Members</span>

    <p>
      Financial literacy,
      entrepreneurship and accounting workshops.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=accounting"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

</div>

{/* =========================
    TECHNOLOGY
========================= */}

<h2 className="category-title">💻 Technology Clubs</h2>

<div className="clubs-grid">

  <div className="club-card" data-category="technology">

    <h3>💻 Programming Club</h3>

    <span>145 Members</span>

    <p>
      Learn Java, Python, Web Development and
      participate in hackathons and coding competitions.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=programming"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="technology">

    <h3>🤖 Robotics Club</h3>

    <span>76 Members</span>

    <p>
      Design robots, automation systems and
      compete in engineering innovation challenges.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=robotics"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="technology">

    <h3>🔒 Cyber Security Club</h3>

    <span>58 Members</span>

    <p>
      Learn ethical hacking,
      digital security and cyber defence.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=cybersecurity"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

</div>

{/* =========================
    SPORTS
========================= */}

<h2 className="category-title">⚽ Sports Clubs</h2>

<div className="clubs-grid">

  <div className="club-card" data-category="sports">

    <h3>⚽ Football Club</h3>

    <span>110 Members</span>

    <p>
      Weekly training sessions,
      university league matches and tournaments.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=football"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="sports">

    <h3>🏀 Basketball Club</h3>

    <span>82 Members</span>

    <p>
      Develop teamwork and compete in
      inter-university competitions.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=basketball"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="sports">

    <h3>🏐 Volleyball Club</h3>

    <span>67 Members</span>

    <p>
      Improve your volleyball skills
      through weekly practice.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=volleyball"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

</div>
{/* =========================
    ENTERTAINMENT
========================= */}

<h2 className="category-title">🎵 Entertainment Clubs</h2>

<div className="clubs-grid">

  <div className="club-card" data-category="entertainment">

    <h3>🎵 Music Club</h3>

    <span>98 Members</span>

    <p>
      Join vocalists, instrumentalists and bands.
      Perform during university events and talent shows.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=music"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="entertainment">

    <h3>📸 Photography Club</h3>

    <span>54 Members</span>

    <p>
      Learn photography, editing and event coverage while
      building an amazing portfolio.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=photography"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="entertainment">

    <h3>💃 Dance Club</h3>

    <span>72 Members</span>

    <p>
      Practice different dance styles and perform during
      university festivals and competitions.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=dance"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

</div>

{/* =========================
    LEADERSHIP
========================= */}

<h2 className="category-title">👔 Leadership Clubs</h2>

<div className="clubs-grid">

  <div className="club-card" data-category="leadership">

    <h3>👔 Student Council</h3>

    <span>25 Members</span>

    <p>
      Represent students, organize university activities
      and develop leadership skills.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=council"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="leadership">

    <h3>🚀 Entrepreneurship Club</h3>

    <span>63 Members</span>

    <p>
      Learn business planning, startup development and
      innovation from experienced entrepreneurs.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=entrepreneurship"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

  <div className="club-card" data-category="leadership">

    <h3>🌍 Rotaract Club</h3>

    <span>44 Members</span>

    <p>
      Participate in community service projects,
      leadership training and volunteer activities.
    </p>

    <div className="club-buttons">

      <Link
        to="/club-details?club=rotaract"
        className="details-btn"
      >
        View Club
      </Link>

      <button className="join-btn">
        Join
      </button>

    </div>

  </div>

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