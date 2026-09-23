const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, category, contact_email
       FROM clubs`
    );

    const clubs = rows.map(club => ({
      club_id: String(club.id),
      name: club.name,
      category: club.category,
      ...(club.contact_email
        ? { contact_email: club.contact_email }
        : {})
    }));

    res.status(200).json({
      clubs
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch clubs'
    });
  }
});

module.exports = router;