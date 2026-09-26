const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all maintenance requests
router.get("/", async (req, res) => {
  try {

    const [requests] = await db.query(
      `SELECT
        id,
        user_id AS userId,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        status
       FROM maintenance_requests
       ORDER BY id DESC`
    );

    res.json(requests);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch maintenance requests"
    });

  }
});


// GET maintenance requests for one student
router.get("/user/:email", async (req, res) => {

  const { email } = req.params;

  try {

    const [requests] = await db.query(
      `SELECT
        id,
        user_id AS userId,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        status
       FROM maintenance_requests
       WHERE email = ?
       ORDER BY id DESC`,
      [email]
    );

    res.json(requests);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch student maintenance requests"
    });

  }

});


// CREATE maintenance request
router.post("/", async (req, res) => {

  const {
    userId,
    student,
    email,
    title,
    category,
    location,
    priority,
    description
  } = req.body;

  if (
    !student ||
    !email ||
    !title ||
    !category ||
    !location ||
    !priority ||
    !description
  ) {

    return res.status(400).json({
      error: "All maintenance request fields are required"
    });

  }

  try {

    const [result] = await db.query(
      `INSERT INTO maintenance_requests
      (
        user_id,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId || null,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        "Pending"
      ]
    );

    const [newRequest] = await db.query(
      `SELECT
        id,
        user_id AS userId,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        status
       FROM maintenance_requests
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(newRequest[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to create maintenance request"
    });

  }

});


// UPDATE maintenance request status
router.patch("/:id/status", async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "In Progress",
    "Completed"
  ];

  if (!allowedStatuses.includes(status)) {

    return res.status(400).json({
      error: "Invalid maintenance status"
    });

  }

  try {

    const [result] = await db.query(
      `UPDATE maintenance_requests
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Maintenance request not found"
      });

    }

    const [updatedRequest] = await db.query(
      `SELECT
        id,
        user_id AS userId,
        student,
        email,
        title,
        category,
        location,
        priority,
        description,
        status
       FROM maintenance_requests
       WHERE id = ?`,
      [id]
    );

    res.json(updatedRequest[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to update maintenance status"
    });

  }

});


// DELETE maintenance request
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM maintenance_requests WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Maintenance request not found"
      });

    }

    res.json({
      message: "Maintenance request deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete maintenance request"
    });

  }

});


module.exports = router;