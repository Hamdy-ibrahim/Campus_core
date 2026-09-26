const express = require("express");
const router = express.Router();
const db = require("../db");


// GET all clubs
router.get("/", async (req, res) => {

  try {

    const [clubs] = await db.query(
      `SELECT
        id,
        name,
        category,
        description,
        members,
        meeting,
        venue,
        president,
        vicePresident,
        secretary,
        founded,
        projects,
        rating,
        requirements,
        activities
       FROM clubs
       ORDER BY id DESC`
    );

    res.json(clubs);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch clubs"
    });

  }

});


// GET one club by ID
router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [clubs] = await db.query(
      `SELECT
        id,
        name,
        category,
        description,
        members,
        meeting,
        venue,
        president,
        vicePresident,
        secretary,
        founded,
        projects,
        rating,
        requirements,
        activities
       FROM clubs
       WHERE id = ?`,
      [id]
    );

    if (clubs.length === 0) {

      return res.status(404).json({
        error: "Club not found"
      });

    }

    res.json(clubs[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch club"
    });

  }

});


// CREATE a club
router.post("/", async (req, res) => {

  const {
    name,
    category,
    description,
    members,
    meeting,
    venue,
    president,
    vicePresident,
    secretary,
    founded,
    projects,
    rating,
    requirements,
    activities
  } = req.body;


  if (!name || !category) {

    return res.status(400).json({
      error: "Club name and category are required"
    });

  }


  try {

    const [result] = await db.query(
      `INSERT INTO clubs
      (
        name,
        category,
        description,
        members,
        meeting,
        venue,
        president,
        vicePresident,
        secretary,
        founded,
        projects,
        rating,
        requirements,
        activities
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        description || null,
        members || null,
        meeting || null,
        venue || null,
        president || null,
        vicePresident || null,
        secretary || null,
        founded || null,
        projects || null,
        rating || null,
        requirements || null,
        activities || null
      ]
    );


    const [newClub] = await db.query(
      `SELECT
        id,
        name,
        category,
        description,
        members,
        meeting,
        venue,
        president,
        vicePresident,
        secretary,
        founded,
        projects,
        rating,
        requirements,
        activities
       FROM clubs
       WHERE id = ?`,
      [result.insertId]
    );


    res.status(201).json(newClub[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to create club"
    });

  }

});


// DELETE a club
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM clubs WHERE id = ?",
      [id]
    );


    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Club not found"
      });

    }


    res.json({
      message: "Club deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete club"
    });

  }

});

// ================================
// GET CLUB MEMBERSHIPS FOR USER
// ================================

router.get("/memberships/user/:userId", async (req, res) => {

  const { userId } = req.params;

  try {

    const [rows] = await db.query(
      `SELECT
        club_memberships.id,
        clubs.id AS clubId,
        clubs.name,
        clubs.category,
        club_memberships.joined_at AS joinedAt
       FROM club_memberships
       INNER JOIN clubs
         ON club_memberships.club_id = clubs.id
       WHERE club_memberships.user_id = ?
       ORDER BY club_memberships.id DESC`,
      [userId]
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch club memberships"
    });

  }
});


// ================================
// JOIN CLUB
// ================================

router.post("/:clubId/join", async (req, res) => {

  const { clubId } = req.params;
  const { userId } = req.body;

  if (!userId) {

    return res.status(400).json({
      error: "User ID is required"
    });

  }

  try {

    // Check whether club exists
    const [clubs] = await db.query(
      "SELECT id, name FROM clubs WHERE id = ?",
      [clubId]
    );

    if (clubs.length === 0) {

      return res.status(404).json({
        error: "Club not found"
      });

    }


    // Add membership
    await db.query(
      `INSERT INTO club_memberships
       (user_id, club_id)
       VALUES (?, ?)`,
      [userId, clubId]
    );


    res.status(201).json({
      message: "Successfully joined club",
      clubId: clubs[0].id,
      clubName: clubs[0].name
    });

  } catch (err) {

    console.error(err);


    // Student already joined this club
    if (err.code === "ER_DUP_ENTRY") {

      return res.status(409).json({
        error: "You have already joined this club"
      });

    }


    res.status(500).json({
      error: "Failed to join club"
    });

  }
});


module.exports = router;

