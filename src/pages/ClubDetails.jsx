import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function ClubDetails() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clubId = searchParams.get("id");

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);


  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );


  // ================================
  // LOAD CLUB
  // ================================

  useEffect(() => {

    async function fetchClub() {

      try {

        const response = await fetch(
          `http://localhost:5000/api/clubs/${clubId}`
        );

        if (!response.ok) {
          throw new Error("Club not found");
        }

        const data =
          await response.json();

        setClub(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    fetchClub();

  }, [clubId]);


  // ================================
  // CHECK MEMBERSHIP
  // ================================

  useEffect(() => {

    if (!club || !currentUser) {
      return;
    }


    async function checkMembership() {

      try {

        const response = await fetch(
          `http://localhost:5000/api/clubs/memberships/user/${currentUser.id}`
        );

        if (!response.ok) {
          return;
        }

        const memberships =
          await response.json();

        const alreadyJoined =
          memberships.some(
            membership =>
              membership.clubId === club.id
          );

        setJoined(alreadyJoined);

      } catch (error) {

        console.error(error);

      }

    }

    checkMembership();

  }, [club, currentUser?.id]);


  // ================================
  // JOIN CLUB
  // ================================

  async function joinClub() {

    if (!currentUser) {

      navigate("/login");

      return;

    }


    if (joined) {

      alert(
        "You have already joined the club."
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


      setJoined(true);

      alert(
        "Successfully joined the club!"
      );


    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to the server."
      );

    }

  }


  if (loading) {

    return (
      <h2>
        Loading club...
      </h2>
    );

  }


  if (!club) {

    return (
      <h2>
        Club not found.
      </h2>
    );

  }


  return (

    <div className="dashboard">

      <Sidebar />


      <main className="main-content">

        <Link
          to="/clubs"
          className="back-btn"
        >

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

            {joined
              ? "✓ Joined"
              : "Join Club"}

          </button>

        </div>


        <div className="club-stats">

          <div>

            <h2>
              {club.members}
            </h2>

            <p>
              Members
            </p>

          </div>


          <div>

            <h2>
              {club.rating} ⭐
            </h2>

            <p>
              Rating
            </p>

          </div>


          <div>

            <h2>
              {club.meeting}
            </h2>

            <p>
              Meeting Day
            </p>

          </div>


          <div>

            <h2>
              {club.venue}
            </h2>

            <p>
              Venue
            </p>

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
                      {activity.trim()}
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

                <li>
                  {club.requirements}
                </li>

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

                <strong>
                  President
                </strong>

                <span>
                  {club.president}
                </span>

              </div>


              <div className="leader">

                <strong>
                  Vice President
                </strong>

                <span>
                  {club.vicePresident}
                </span>

              </div>


              <div className="leader">

                <strong>
                  Secretary
                </strong>

                <span>
                  {club.secretary}
                </span>

              </div>

            </div>


            <div className="detail-card">

              <h2>

                <i className="fa-solid fa-chart-line"></i>

                Club Statistics

              </h2>


              <div className="stats-list">

                <p>
                  <strong>
                    Founded:
                  </strong>{" "}
                  {club.founded}
                </p>

                <p>
                  <strong>
                    Projects Completed:
                  </strong>{" "}
                  {club.projects}
                </p>

                <p>
                  <strong>
                    Hackathons Won:
                  </strong>{" "}
                  12
                </p>

                <p>
                  <strong>
                    Current Members:
                  </strong>{" "}
                  {club.members}
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