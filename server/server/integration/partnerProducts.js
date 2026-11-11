
const express = require('express');
const router = express.Router();

function getPartnerConfig() {
  const version = process.env.PARTNER_VERSION || 'v1';

  if (version === 'v1') {
    return {
      url: '/api/products',
      parse: (body) => {
        if (!Array.isArray(body)) {
          throw new Error('Invalid v1 products response.');
        }
        return body;
      },
    };
  }

  throw new Error(`Unsupported partner API version: ${version}`);
}

router.get('/products', async (req, res) => {
  const baseUrl = process.env.PARTNER_URL?.replace(/\/+$/, '');
  const apiKey = process.env.PARTNER_API_KEY;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Partner configuration missing.',
    });
  }

  try {
    const config = getPartnerConfig();

    const response = await fetch(`${baseUrl}${config.url}`, {
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

    const body = await response.json();
    const products = config.parse(body);

    return res.status(200).json({ products });

  } catch (error) {
    console.error('Partner products error:', error.message);

    return res.status(502).json({
      message: 'Could not retrieve partner products.',
    });
  }
});

module.exports = router;
