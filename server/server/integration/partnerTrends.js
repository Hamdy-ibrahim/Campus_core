
const express = require('express');
const router = express.Router();

const { fetchWithRetry } = require('./resilientFetch');

// Store the most recent successful trends response in memory.
let lastGood = null;

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

    const response = await fetchWithRetry(
      `${baseUrl}/api/insights/trends`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-API-Key': partnerApiKey,
        },
      },
      {
        timeoutMs: 1500,
        retries: 2,
        delayMs: 200,
      }
    );

    if (!response.ok) {
      throw new Error(`Partner returned status ${response.status}`);
    }

    const trends = await response.json();

    if (!Array.isArray(trends)) {
      throw new Error('Partner returned an unexpected response format.');
    }

    // Save the latest successful response.
    lastGood = {
      data: trends,
      asOf: new Date().toISOString(),
    };

    return res.status(200).json({
      trends,
      stale: false,
      asOf: lastGood.asOf,
    });

  } catch (error) {
    console.error(
      'Partner trends request failed:',
      error.cause?.code || error.message
    );

    // Return saved data if available.
    if (lastGood) {
      console.warn('Returning previously saved partner trends.');

      return res.status(200).json({
        trends: lastGood.data,
        stale: true,
        asOf: lastGood.asOf,
      });
    }

    // No saved data is available.
    return res.status(502).json({
      message: 'Product trends are temporarily unavailable.',
    });
  }
});

module.exports = router;
