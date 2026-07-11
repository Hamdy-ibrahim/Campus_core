import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {

  let saved = JSON.parse(localStorage.getItem("announcements"));

  if (!saved) {

    saved = [

      {
        id: 1,
        title: "Semester Registration",
        category: "Academic",
        description: "Semester registration closes this Friday at 5:00 PM.",
        date: "20 July 2026",
        priority: "High"
      },

      {
        id: 2,
        title: "Innovation Fair",
        category: "Events",
        description: "Students are invited to showcase innovative projects.",
        date: "25 July 2026",
        priority: "Medium"
      },

      {
        id: 3,
        title: "Library Hours Extended",
        category: "Library",
        description: "The library will remain open until 10 PM during exams.",
        date: "18 July 2026",
        priority: "Low"
      }

    ];

    localStorage.setItem(
      "announcements",
      JSON.stringify(saved)
    );

  }

  setAnnouncements(saved);

}, []);

  return (

    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <section className="announcement-hero">

          <h1>📢 Announcements</h1>

          <p>

            Stay updated with the latest university news and notices.

          </p>

        </section>

        <div className="announcement-list">

          {announcements.map((announcement) => (

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

              <h2>{announcement.title}</h2>

              <p>{announcement.description}</p>

              <small>

                📅 {announcement.date}

              </small>

            </div>

          ))}

        </div>

      </main>

    </div>

  );

}

export default Announcements;