const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/listings', async (req, res) => {
  try {
    const { status } = req.query;

    if (status !== 'active') {
      return res.status(400).json({
        error: 'Status must be active'
      });
    }

    const [rows] = await db.query(
      `SELECT id, title, price, description, currency
       FROM marketplace
       WHERE status = ?`,
      [status]
    );

    const listings = rows.map(item => ({
      listing_id: String(item.id),
      item_name: item.title,
      ...(item.description
        ? { description: item.description }
        : {}),
      price: Number(item.price),
      currency: item.currency
    }));

    res.status(200).json({
      listings
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch marketplace listings'
    });
  }
});

module.exports = router;