const express = require("express");
const router = express.Router();
const db = require("../db");
const { randomUUID } = require("crypto");

// PROVIDER API
// POST /fitcoach-users/:fitcoach_userId/fitcoach-bindings

router.post("/:fitcoach_userId/fitcoach-bindings", async (req, res) => {
  const { fitcoach_userId } = req.params;
  const { campuscore_student_id, verification_token } = req.body;

  // Validate required fields
  if (!campuscore_student_id || !verification_token) {
    return res.status(400).json({
      error: "CampusCore student ID and verification token are required"
    });
  }

  try {
    // Check that the CampusCore student exists
    const [students] = await db.query(
  `SELECT public_id
   FROM users
   WHERE public_id = ?`,
  [campuscore_student_id]
);

    if (students.length === 0) {
      return res.status(404).json({
        error: "CampusCore student not found"
      });
    }

    // Check whether this FitCoach account is already linked
    const [existingFitCoach] = await db.query(
      `SELECT id
       FROM fitcoach_bindings
       WHERE fitcoach_user_id = ?`,
      [fitcoach_userId]
    );

    if (existingFitCoach.length > 0) {
      return res.status(409).json({
        error: "FitCoach user is already linked"
      });
    }

    // Check whether this CampusCore student is already linked
    const [existingStudent] = await db.query(
      `SELECT id
       FROM fitcoach_bindings
       WHERE campuscore_student_id = ?`,
      [campuscore_student_id]
    );

    if (existingStudent.length > 0) {
      return res.status(409).json({
        error: "CampusCore student is already linked to a FitCoach account"
      });
    }

    // Generate a UUID for the binding
    const bindingId = randomUUID();

    // Create the binding
    const [result] = await db.query(
      `INSERT INTO fitcoach_bindings
       (
         binding_id,
         fitcoach_user_id,
         campuscore_student_id,
         verification_token,
         status
       )
       VALUES (?, ?, ?, ?, ?)`,
      [
        bindingId,
        fitcoach_userId,
        campuscore_student_id,
        verification_token,
        "active"
      ]
    );

    // Get the creation time
    const [binding] = await db.query(
      `SELECT
        binding_id,
        status,
        bound_at
       FROM fitcoach_bindings
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      binding_id: binding[0].binding_id,
      status: binding[0].status,
      bound_at: binding[0].bound_at
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create FitCoach binding"
    });
  }
});

module.exports = router;