
const express = require('express');
const router = express.Router();

const { fetchWithRetry } = require('./resilientFetch');

let lastGood = null;

// Select the partner API configuration.
function getPartnerConfig() {
  const version = process.env.PARTNER_VERSION || 'v1';

  if (version === 'v1') {
    return {
      url: '/api/insights/trends',
      parse: (body) => {
        if (!Array.isArray(body)) {
          throw new Error('Invalid v1 trends response.');
        }
        return body;
      },
    };
  }

  throw new Error(`Unsupported partner API version: ${version}`);
}

router.get('/trends', async (req, res) => {
  const partnerUrl = process.env.PARTNER_URL;
  const partnerApiKey = process.env.PARTNER_API_KEY;

  if (!partnerUrl || !partnerApiKey) {
    return res.status(500).json({
      message: 'Partner configuration is missing.',
    });
  }

  try {
    const config = getPartnerConfig();
    const baseUrl = partnerUrl.replace(/\/+$/, '');

    const response = await fetchWithRetry(
      `${baseUrl}${config.url}`,
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

    const body = await response.json();
    const trends = config.parse(body);

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
    console.error('Partner trends error:', error.message);

    if (lastGood) {
      return res.status(200).json({
        trends: lastGood.data,
        stale: true,
        asOf: lastGood.asOf,
      });
    }

    return res.status(502).json({
      message: 'Product trends are temporarily unavailable.',
    });
  }
});

module.exports = router;
