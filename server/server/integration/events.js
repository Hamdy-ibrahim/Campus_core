const express = require("express");
const router = express.Router();
const db = require("../db");

function formatDate(dateValue) {
  if (!dateValue) return null;

  if (dateValue instanceof Date) {
    return dateValue.toISOString().slice(0, 10);
  }

  const value = String(dateValue).trim();

  // Already YYYY-MM-DD
  const isoMatch = value.match(/^(\d{4}-\d{2}-\d{2})$/);
  if (isoMatch) return isoMatch[1];

  // Database format: 20 August 2026
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function formatTime(timeValue) {
  if (!timeValue) return "00:00:00";

  const value = String(timeValue).trim();

  // Handle 9:00 AM, 2:30 PM, etc.
  const ampmMatch = value.match(
    /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i
  );

  if (ampmMatch) {
    let hours = Number(ampmMatch[1]);
    const minutes = ampmMatch[2];
    const seconds = ampmMatch[3] || "00";
    const period = ampmMatch[4].toUpperCase();

    if (hours < 1 || hours > 12) return null;

    if (period === "AM" && hours === 12) hours = 0;
    if (period === "PM" && hours !== 12) hours += 12;

    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  }

  // Handle MySQL TIME format: HH:mm or HH:mm:ss
  if (/^\d{2}:\d{2}$/.test(value)) {
    return `${value}:00`;
  }

  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {
    return value;
  }

  return null;
}

router.get("/", async (req, res) => {
  try {
    const [events] = await db.query(
      `SELECT public_id, title, description, location, date, time
       FROM events
       ORDER BY id DESC`
    );

    const formattedEvents = events.map((event) => {
      const date = formatDate(event.date);
      const time = formatTime(event.time);

      let startTime = null;

      if (date && time) {
        const candidate = `${date}T${time}Z`;

        if (!Number.isNaN(Date.parse(candidate))) {
          startTime = candidate;
        }
      }

      return {
        event_id: String(event.public_id),
        title: event.title,
        description: event.description,
        location: event.location,
        start_time: startTime,
        end_time: null
      };
    });

    res.json({ events: formattedEvents });
  } catch (err) {
    console.error("Error fetching integration events:", err);

    res.status(500).json({
      error: "Failed to fetch events"
    });
  }
});

module.exports = router;