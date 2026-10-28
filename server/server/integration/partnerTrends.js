
const express = require('express');

const router = express.Router();

router.get('/trends', async (req, res) => {
  const partnerUrl = process.env.PARTNER_URL;
  const partnerApiKey = process.env.PARTNER_API_KEY;

  if (!partnerUrl) {
    console.error('Partner integration error: PARTNER_URL is missing.');
    return res.status(500).json({
      message: 'Product trends are temporarily unavailable.',
    });
  }

  if (!partnerApiKey) {
    console.error('Partner integration error: PARTNER_API_KEY is missing.');
    return res.status(500).json({
      message: 'Partner API key is not configured.',
    });
  }

  try {
    const baseUrl = partnerUrl.replace(/\/+$/, '');

    const response = await fetch(
      `${baseUrl}/api/insights/trends`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-API-Key': partnerApiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Partner trends request failed with status ${response.status}.`
      );

      return res.status(502).json({
        message: 'Product trends are temporarily unavailable.',
      });
    }

    const trends = await response.json();

    if (!Array.isArray(trends)) {
      console.error('Partner trends returned an unexpected response format.');
      return res.status(502).json({
        message: 'Product trends are temporarily unavailable.',
      });
    }

    return res.status(200).json({ trends });
  } catch (error) {
    console.error(
      'Partner trends request failed:',
      error.cause?.code || error.message
    );

    return res.status(502).json({
      message: 'Product trends are temporarily unavailable. Please try again later.',
    });
  }
});

module.exports = router;
