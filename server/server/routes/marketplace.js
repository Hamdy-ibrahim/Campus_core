const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all active marketplace listings
router.get("/", async (req, res) => {
  try {
    const status = req.query.status || "active";

    const [items] = await db.query(
      `SELECT
        id,
        title,
        price,
        category,
        description,
        emoji,
        seller,
        seller_email AS sellerEmail,
        status
       FROM marketplace
       WHERE status = ?
       ORDER BY id DESC`,
      [status]
    );

    res.json(items);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch marketplace listings"
    });

  }
});


// GET one marketplace item
router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [items] = await db.query(
      `SELECT
        id,
        title,
        price,
        category,
        description,
        emoji,
        seller,
        seller_email AS sellerEmail,
        status
       FROM marketplace
       WHERE id = ?`,
      [id]
    );

    if (items.length === 0) {

      return res.status(404).json({
        error: "Marketplace item not found"
      });

    }

    res.json(items[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch marketplace item"
    });

  }

});


// CREATE marketplace listing
router.post("/", async (req, res) => {

  const {
    title,
    price,
    category,
    description,
    emoji,
    seller,
    sellerEmail
  } = req.body;


  if (
    !title ||
    price === undefined ||
    !category ||
    !description ||
    !seller ||
    !sellerEmail
  ) {

    return res.status(400).json({
      error: "Title, price, category, description, seller and seller email are required"
    });

  }


  const numericPrice = Number(price);


  if (Number.isNaN(numericPrice) || numericPrice < 0) {

    return res.status(400).json({
      error: "Price must be a valid positive number"
    });

  }


  try {

    const [result] = await db.query(
      `INSERT INTO marketplace
      (
        title,
        price,
        category,
        description,
        emoji,
        seller,
        seller_email,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        numericPrice,
        category,
        description,
        emoji || "📦",
        seller,
        sellerEmail,
        "active"
      ]
    );


    const [newItem] = await db.query(
      `SELECT
        id,
        title,
        price,
        category,
        description,
        emoji,
        seller,
        seller_email AS sellerEmail,
        status
       FROM marketplace
       WHERE id = ?`,
      [result.insertId]
    );


    res.status(201).json(newItem[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to create marketplace listing"
    });

  }

});


// DELETE marketplace listing
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.query(
      "DELETE FROM marketplace WHERE id = ?",
      [id]
    );


    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Marketplace item not found"
      });

    }


    res.json({
      message: "Marketplace listing deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete marketplace listing"
    });

  }

});


module.exports = router;