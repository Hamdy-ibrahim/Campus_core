const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, fullname, studentid, email, course, year FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  const { fullname, studentid, email, course, year, password } = req.body;

  if (!fullname || !studentid || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (fullname, studentid, email, course, year, password)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [fullname, studentid, email, course, year, hashedPassword]
    );

    res.status(201).json({ id: result.insertId, fullname, studentid, email, course, year });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Student ID or email already registered' });
    }
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

module.exports = router;