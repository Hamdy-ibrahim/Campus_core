
const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,

  handler: (req, res) => {
    res.set('Retry-After', '60');

    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.'
    });
  }
});

module.exports = apiRateLimiter;
