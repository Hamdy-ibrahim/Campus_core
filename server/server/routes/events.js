const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, title, description, location, date, time
       FROM events
       ORDER BY date ASC`
    );

    const events = rows.map(event => {
      const date = new Date(event.date);

      const datePart = date.toISOString().split('T')[0];

      let startTime = `${datePart}T00:00:00Z`;
      let endTime = null;

      if (event.time) {
        const timeString = String(event.time).substring(0, 8);

        startTime = `${datePart}T${timeString}Z`;
      }

      return {
        event_id: String(event.id),
        title: event.title,
        ...(event.description
          ? { description: event.description }
          : {}),
        location: event.location,
        start_time: startTime,
        ...(endTime ? { end_time: endTime } : {})
      };
    });

    res.status(200).json({
      events
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch events'
    });
  }
});

module.exports = router;