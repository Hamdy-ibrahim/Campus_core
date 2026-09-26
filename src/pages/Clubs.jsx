import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Clubs.css";

function Clubs() {

  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");


  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );


  useEffect(() => {

    if (!currentUser) {
      navigate("/login");
      return;
    }


    async function loadData() {

      try {

        // Load clubs
        const clubsResponse = await fetch(
          "http://localhost:5000/api/clubs"
        );

        if (!clubsResponse.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const clubsData =
          await clubsResponse.json();

        setClubs(clubsData);


        // Load user's memberships
        const membershipResponse = await fetch(
          `http://localhost:5000/api/clubs/memberships/user/${currentUser.id}`
        );

        if (!membershipResponse.ok) {
          throw new Error(
            "Failed to fetch memberships"
          );
        }

        const membershipData =
          await membershipResponse.json();

        setJoinedClubs(membershipData);


      } catch (error) {

        console.error(error);

        alert(
          "Could not load clubs from the server."
        );

      }

    }


    loadData();

  }, [navigate, currentUser?.id]);


  async function joinClub(club) {

    if (!currentUser) {
      navigate("/login");
      return;
    }


    // Check local state first
    const alreadyJoined = joinedClubs.some(
      joinedClub =>
        joinedClub.clubId === club.id
    );


    if (alreadyJoined) {

      alert(
        "You have already joined this club."
      );

      return;

    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/clubs/${club.id}/join`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: currentUser.id
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.error ||
          "Failed to join club."
        );

        return;

      }


      // Add the newly joined club to the page
      setJoinedClubs(prev => [
        ...prev,
        {
          clubId: club.id,
          name: club.name,
          category: club.category
        }
      ]);


      alert(
        "Successfully joined " +
        club.name
      );


    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to the server."
      );

    }

  }


  const filteredClubs =
    clubs.filter((club) => {

      const matchesCategory =
        category === "all" ||
        club.category.toLowerCase() === category;

      const matchesSearch =
        club.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );

    });


  return (

    <div className="dashboard">

      <aside className="sidebar">

        <h2>CampusCore</h2>

        <ul>

          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/clubs"
              className="active"
            >
              Clubs
            </Link>
          </li>

          <li>
            <Link to="/events">
              Events
            </Link>
          </li>

          <li>
            <a href="#">
              Marketplace
            </a>
          </li>

          <li>
            <a href="#">
              Announcements
            </a>
          </li>

          <li>
            <a href="#">
              Maintenance
            </a>
          </li>

          <li>
            <Link to="/">
              Logout
            </Link>
          </li>

        </ul>

      </aside>


      <main className="main-content">


        <section className="clubs-hero">

          <h1>
            🏛 Student Clubs
          </h1>

          <p>
            Join clubs, develop new skills,
            meet fellow students and make the
            most of your university experience.
          </p>

        </section>


        <section className="clubs-summary">

          <div className="summary-card">

            <h3>
              Joined Clubs
            </h3>

            <h1>
              {joinedClubs.length}
            </h1>

            <p>

              You're currently a member of{" "}

              {joinedClubs.length === 1
                ? "1 Club"
                : `${joinedClubs.length} Clubs`}

            </p>

          </div>

        </section>


        <div className="club-search">

          <input
            type="text"
            placeholder="Search for a club..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="club-filters">

          <button
            className={
              category === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("all")
            }
          >
            All
          </button>


          <button
            className={
              category === "academic"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("academic")
            }
          >
            Academic
          </button>


          <button
            className={
              category === "technology"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("technology")
            }
          >
            Technology
          </button>


          <button
            className={
              category === "sports"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("sports")
            }
          >
            Sports
          </button>


          <button
            className={
              category === "entertainment"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("entertainment")
            }
          >
            Entertainment
          </button>


          <button
            className={
              category === "leadership"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setCategory("leadership")
            }
          >
            Leadership
          </button>

        </div>


        <div className="clubs-grid">

          {filteredClubs.map((club) => (

            <div
              key={club.id}
              className="club-card"
              data-category={
                club.category.toLowerCase()
              }
            >

              <h3>
                {club.name}
              </h3>

              <span>
                {club.members}
              </span>

              <p>
                {club.description}
              </p>


              <div className="club-buttons">

                <Link
                  to={`/club-details?id=${club.id}`}
                  className="details-btn"
                >
                  View Club
                </Link>


                <button
                  className="join-btn"
                  onClick={() =>
                    joinClub(club)
                  }
                  disabled={
                    joinedClubs.some(
                      joinedClub =>
                        joinedClub.clubId === club.id
                    )
                  }
                >

                  {joinedClubs.some(
                    joinedClub =>
                      joinedClub.clubId === club.id
                  )
                    ? "✓ Joined"
                    : "Join"}

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