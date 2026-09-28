const express = require("express");
const router = express.Router();
const db = require("../db");

// PROVIDER API
// GET /events
// Returns events in the format defined by the OpenAPI contract

router.get("/", async (req, res) => {
  try {
    const [events] = await db.query(
      `SELECT
        public_id,
        title,
        description,
        location,
        date,
        time
       FROM events
       ORDER BY id DESC`
    );

    const formattedEvents = events.map(event => {
      let startTime = null;
      let endTime = null;

      // Combine the existing date and time fields
      if (event.date) {
        const time = event.time || "00:00";
        startTime = `${event.date}T${time}:00Z`;
      }

      return {
        event_id: event.public_id,
        title: event.title,
        description: event.description,
        location: event.location,
        start_time: startTime,
        end_time: endTime
      };
    });

    res.json({
      events: formattedEvents
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch events"
    });
  }
});

module.exports = router;