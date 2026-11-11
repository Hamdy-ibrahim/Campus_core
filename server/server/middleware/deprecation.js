
function deprecationMiddleware(req, res, next) {
  res.setHeader("Deprecation", "true");

  res.setHeader(
    "Sunset",
    "Mon, 30 Nov 2026 23:59:59 GMT"
  );

  res.setHeader(
    "Link",
    '</v2/events>; rel="successor-version"'
  );

  next();
}

module.exports = deprecationMiddleware;
