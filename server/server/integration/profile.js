const express = require("express");
const router = express.Router();
const db = require("../db");

// PROVIDER API
// GET /fitcoach-users/:fitcoach_userId/profile

router.get("/:fitcoach_userId/profile", async (req, res) => {
  const { fitcoach_userId } = req.params;

  try {
    // Find the CampusCore student connected to this FitCoach account
    const [bindings] = await db.query(
      `SELECT campuscore_student_id
       FROM fitcoach_bindings
       WHERE fitcoach_user_id = ?
       AND status = 'active'`,
      [fitcoach_userId]
    );

    if (bindings.length === 0) {
      return res.status(404).json({
        error: "FitCoach user is not linked to a CampusCore student"
      });
    }

    const campuscoreStudentId = bindings[0].campuscore_student_id;

    // Find the actual CampusCore student
    const [students] = await db.query(
  `SELECT
    public_id,
    fullname,
    email,
    course
   FROM users
   WHERE public_id = ?`,
  [campuscoreStudentId]
);

    if (students.length === 0) {
      return res.status(404).json({
        error: "CampusCore student not found"
      });
    }

    const student = students[0];

    // Split fullname into first and last name
    const nameParts = student.fullname.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    res.json({
      student_id: student.public_id,
      first_name: firstName,
      last_name: lastName,
      email: student.email,
      major: student.course
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch student profile"
    });
  }
});

module.exports = router;