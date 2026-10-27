
function requireApiKey(req, res, next) {
  const configuredKeys = (process.env.API_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  const providedKey = req.get('X-API-Key');

  if (configuredKeys.length === 0) {
    return res.status(500).json({
      error: 'API authentication is not configured'
    });
  }

  if (
    !providedKey ||
    !configuredKeys.some((key) => key === providedKey)
  ) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'A valid X-API-Key header is required'
    });
  }

  next();
}

module.exports = requireApiKey;
