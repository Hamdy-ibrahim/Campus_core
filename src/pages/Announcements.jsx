import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchAnnouncements() {

      try {

        const response = await fetch(
          "http://localhost:5000/api/announcements"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch announcements"
          );
        }

        const data = await response.json();

        setAnnouncements(data);

      } catch (error) {

        console.error(error);

        alert(
          "Could not load announcements from the server."
        );

      } finally {

        setLoading(false);

      }

    }

    fetchAnnouncements();

  }, []);


  if (loading) {

    return (
      <div className="dashboard">

        <Sidebar />

        <main className="main-content">

          <h2>Loading announcements...</h2>

        </main>

      </div>
    );

  }


  return (

    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <section className="announcement-hero">

          <h1>📢 Announcements</h1>

          <p>
            Stay updated with the latest university news
            and notices.
          </p>

        </section>


        <div className="announcement-list">

          {announcements.length === 0 ? (

            <p>No announcements available.</p>

          ) : (

            announcements.map(
              (announcement) => (

                <div
                  className="announcement-card"
                  key={announcement.id}
                >

                  <div className="announcement-top">

                    <span className="announcement-category">

                      {announcement.category}

                    </span>


                    <span
                      className={`priority ${announcement.priority.toLowerCase()}`}
                    >

                      {announcement.priority}

                    </span>

                  </div>


                  <h2>
                    {announcement.title}
                  </h2>


                  <p>
                    {announcement.description}
                  </p>


                  <small>

                    📅 {announcement.date}

                  </small>

                </div>

              )
            )

          )}

        </div>

      </main>

    </div>

  );

}

export default Announcements;