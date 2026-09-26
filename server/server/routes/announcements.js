const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all announcements
router.get("/", async (req, res) => {
  try {
    const [announcements] = await db.query(
      `SELECT
        id,
        title,
        category,
        description,
        date,
        priority
       FROM announcements
       ORDER BY id DESC`
    );

    res.json(announcements);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch announcements"
    });

  }
});


// GET one announcement
router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [announcements] = await db.query(
      `SELECT
        id,
        title,
        category,
        description,
        date,
        priority
       FROM announcements
       WHERE id = ?`,
      [id]
    );

    if (announcements.length === 0) {

      return res.status(404).json({
        error: "Announcement not found"
      });

    }

    res.json(announcements[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch announcement"
    });

  }

});


// CREATE announcement
router.post("/", async (req, res) => {

  const {
    title,
    category,
    description,
    date,
    priority
  } = req.body;

  if (
    !title ||
    !category ||
    !description ||
    !date ||
    !priority
  ) {

    return res.status(400).json({
      error: "All announcement fields are required"
    });

  }

  try {

    const [result] = await db.query(
      `INSERT INTO announcements
      (
        title,
        category,
        description,
        date,
        priority
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        category,
        description,
        date,
        priority
      ]
    );

    const [newAnnouncement] = await db.query(
      `SELECT
        id,
        title,
        category,
        description,
        date,
        priority
       FROM announcements
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(newAnnouncement[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to create announcement"
    });

  }

});


// DELETE announcement
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM announcements WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Announcement not found"
      });

    }

    res.json({
      message: "Announcement deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete announcement"
    });

  }

});


module.exports = router;