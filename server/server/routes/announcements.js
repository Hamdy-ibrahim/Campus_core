const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, title, description, date
       FROM announcements
       ORDER BY date DESC`
    );

    const announcements = rows.map(announcement => {
      const date = new Date(announcement.date);

      return {
        announcement_id: String(announcement.id),
        headline: announcement.title,
        ...(announcement.description
          ? { content: announcement.description }
          : {}),
        published_at: date.toISOString()
      };
    });

    res.status(200).json({
      announcements
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch announcements'
    });
  }
});

module.exports = router;