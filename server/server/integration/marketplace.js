const express = require("express");
const router = express.Router();
const db = require("../db");

// PROVIDER API
// GET /marketplace/listings?status=active
// Returns marketplace listings in the format defined by the OpenAPI contract

router.get("/listings", async (req, res) => {
  try {
    const { status } = req.query;

    // The OpenAPI contract requires status=active
    if (status !== "active") {
      return res.status(400).json({
        error: "The status query parameter must be 'active'"
      });
    }

    const [listings] = await db.query(
      `SELECT
        public_id,
        title,
        description,
        price
       FROM marketplace
       WHERE status = ?
       ORDER BY id DESC`,
      [status]
    );

    const formattedListings = listings.map(listing => ({
      listing_id: listing.public_id,
      item_name: listing.title,
      description: listing.description,
      price: Number(listing.price),
      currency: "KES"
    }));

    res.json({
      listings: formattedListings
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch marketplace listings"
    });
  }
});

module.exports = router;