const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// GET all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
        id,
        fullname,
        studentid,
        email,
        course,
        year
       FROM users`
    );

    res.json(rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});


// STUDENT SIGNUP
router.post("/", async (req, res) => {

  const {
    fullname,
    studentid,
    email,
    course,
    year,
    password
  } = req.body;

  if (
    !fullname ||
    !studentid ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  try {

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const [result] = await db.query(
      `INSERT INTO users
      (
        fullname,
        studentid,
        email,
        course,
        year,
        password
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        fullname,
        studentid,
        email,
        course,
        year,
        hashedPassword
      ]
    );

    res.status(201).json({
      id: result.insertId,
      fullname,
      studentid,
      email,
      course,
      year
    });

  } catch (err) {

    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Student ID or email already registered"
      });
    }

    res.status(500).json({
      error: "Signup failed"
    });
  }
});


// STUDENT LOGIN
router.post("/login", async (req, res) => {

  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  try {

    // Find the student by email
    const [users] = await db.query(
      `SELECT *
       FROM users
       WHERE email = ?`,
      [email.trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: "Incorrect email or password"
      });
    }

    const user = users[0];

    // Compare entered password with bcrypt hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Incorrect email or password"
      });
    }

    // Do NOT send the password back to React
    res.json({
      message: "Login successful",

      user: {
        id: user.id,
        fullname: user.fullname,
        studentid: user.studentid,
        email: user.email,
        course: user.course,
        year: user.year
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Login failed"
    });
  }
});
// DELETE student
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Student not found"
      });

    }

    res.json({
      message: "Student deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete student"
    });

  }
});


module.exports = router;