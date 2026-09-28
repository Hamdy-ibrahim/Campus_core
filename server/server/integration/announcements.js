const express = require("express");
const router = express.Router();
const db = require("../db");

// PROVIDER API
// GET /announcements
// Returns announcements in the format defined by the OpenAPI contract

router.get("/", async (req, res) => {
  try {
    const [announcements] = await db.query(
      `SELECT
        public_id,
        title,
        description,
        date
       FROM announcements
       ORDER BY id DESC`
    );

    const formattedAnnouncements = announcements.map(announcement => ({
      announcement_id: announcement.public_id,
      headline: announcement.title,
      content: announcement.description,
      published_at: announcement.date
    }));

    res.json({
      announcements: formattedAnnouncements
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch announcements"
    });
  }
});

module.exports = router;