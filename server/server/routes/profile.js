const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:fitcoach_userId/profile', async (req, res) => {
  try {
    const { fitcoach_userId } = req.params;

    const [rows] = await db.query(
      `SELECT
        fitcoach_user_id,
        fullname,
        email,
        course
       FROM users
       WHERE fitcoach_user_id = ?`,
      [fitcoach_userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Student profile not found'
      });
    }

    const user = rows[0];

    const nameParts = user.fullname.trim().split(' ');

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    res.status(200).json({
      student_id: user.fitcoach_user_id,
      first_name: firstName,
      last_name: lastName,
      email: user.email,
      major: user.course
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch student profile'
    });
  }
});

module.exports = router;