
const express = require('express');
const router = express.Router();

router.get('/products', async (req, res) => {
  const baseUrl = process.env.PARTNER_URL?.replace(/\/+$/, '');
  const apiKey = process.env.PARTNER_API_KEY;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({ message: 'Partner configuration missing.' });
  }

  try {
    const response = await fetch(`${baseUrl}/api/products`, {
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        message: 'Partner products are temporarily unavailable.',
      });
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
      return res.status(502).json({ message: 'Unexpected products response.' });
    }

    res.json({ products });
  } catch (error) {
    console.error('Partner products error:', error.message);
    res.status(502).json({ message: 'Could not retrieve partner products.' });
  }
});

module.exports = router;
