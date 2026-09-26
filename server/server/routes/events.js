const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all events
router.get("/", async (req, res) => {
  try {
    const [events] = await db.query(
      `SELECT
        id,
        title,
        date,
        location,
        category,
        description,
        time,
        venue,
        organizer,
        requirements,
        schedule
       FROM events
       ORDER BY id DESC`
    );

    res.json(events);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch events"
    });
  }
});


// POST a new event
router.post("/", async (req, res) => {

  const {
    title,
    date,
    location,
    category,
    description,
    time,
    venue,
    organizer,
    requirements,
    schedule
  } = req.body;

  if (!title || !date || !location || !category) {
    return res.status(400).json({
      error: "Title, date, location and category are required"
    });
  }

  try {

    const [result] = await db.query(
      `INSERT INTO events
      (
        title,
        date,
        location,
        category,
        description,
        time,
        venue,
        organizer,
        requirements,
        schedule
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        date,
        location,
        category,
        description || null,
        time || null,
        venue || null,
        organizer || null,
        JSON.stringify(requirements || []),
        JSON.stringify(schedule || [])
      ]
    );

    const [newEvent] = await db.query(
      `SELECT
        id,
        title,
        date,
        location,
        category,
        description,
        time,
        venue,
        organizer,
        requirements,
        schedule
       FROM events
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(newEvent[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to create event"
    });

  }
});
// GET one event by ID
router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [events] = await db.query(
      `SELECT
        id,
        title,
        date,
        location,
        category,
        description,
        time,
        venue,
        organizer,
        requirements,
        schedule
       FROM events
       WHERE id = ?`,
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        error: "Event not found"
      });
    }

    res.json(events[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch event"
    });

  }

});


// DELETE an event
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM events WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete event"
    });

  }
});

// GET EVENT REGISTRATIONS FOR A USER
router.get("/registrations/user/:userId", async (req, res) => {

  const { userId } = req.params;

  try {

    const [rows] = await db.query(
      `SELECT
        event_registrations.id,
        events.id AS eventId,
        events.title,
        events.date,
        events.location,
        events.category,
        event_registrations.registered_at AS registeredAt
       FROM event_registrations
       INNER JOIN events
         ON event_registrations.event_id = events.id
       WHERE event_registrations.user_id = ?
       ORDER BY event_registrations.id DESC`,
      [userId]
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch event registrations"
    });

  }
});


// REGISTER FOR EVENT
router.post("/:eventId/register", async (req, res) => {

  const { eventId } = req.params;
  const { userId } = req.body;

  if (!userId) {

    return res.status(400).json({
      error: "User ID is required"
    });

  }

  try {

    const [events] = await db.query(
      "SELECT id, title FROM events WHERE id = ?",
      [eventId]
    );

    if (events.length === 0) {

      return res.status(404).json({
        error: "Event not found"
      });

    }

    await db.query(
      `INSERT INTO event_registrations
       (user_id, event_id)
       VALUES (?, ?)`,
      [userId, eventId]
    );

    res.status(201).json({
      message: "Successfully registered for event",
      eventId: events[0].id,
      eventTitle: events[0].title
    });

  } catch (err) {

    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {

      return res.status(409).json({
        error: "You have already registered for this event"
      });

    }

    res.status(500).json({
      error: "Failed to register for event"
    });

  }

});



module.exports = router;