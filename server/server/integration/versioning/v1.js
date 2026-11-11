
const express = require("express");
const router = express.Router();

// Import the existing FitCoach integration routes
const eventsRoutes = require("../events");
const clubsRoutes = require("../clubs");
const announcementsRoutes = require("../announcements");
const marketplaceRoutes = require("../marketplace");
const profileRoutes = require("../profile");
const bindingsRoutes = require("../bindings");

// Preserve the existing response formats in v1
router.use("/events", eventsRoutes);
router.use("/clubs", clubsRoutes);
router.use("/announcements", announcementsRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/fitcoach-users", profileRoutes);
router.use("/fitcoach-users", bindingsRoutes);

module.exports = router;
