const express = require("express");
const router = express.Router();
const db = require("../db");

// PROVIDER API
// GET /clubs
// Returns clubs in the format defined by the OpenAPI contract

router.get("/", async (req, res) => {
  try {
    const [clubs] = await db.query(
      `SELECT
        public_id,
        name,
        category
       FROM clubs
       ORDER BY id DESC`
    );

    const formattedClubs = clubs.map(club => ({
      club_id: club.public_id,
      name: club.name,
      category: club.category
    }));

    res.json({
      clubs: formattedClubs
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch clubs"
    });
  }
});

module.exports = router;