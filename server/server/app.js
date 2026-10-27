
const express = require('express');
const cors = require('cors');

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Public health endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CampusCore API is running'
  });
});

// Rate limiter and API-key authentication
const apiRateLimiter = require('./middleware/rateLimiter');
const requireApiKey = require('./middleware/apiKeyAuth');

// CampusCore application routes
// These browser-facing routes currently do not use the shared partner API key.
// Add proper student/admin authentication and authorization before production.
const signupRoutes = require('./routes/signup');
app.use('/api/signup', signupRoutes);

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const clubRoutes = require('./routes/clubs');
app.use('/api/clubs', clubRoutes);

const announcementRoutes = require('./routes/announcements');
app.use('/api/announcements', announcementRoutes);

const marketplaceRoutes = require('./routes/marketplace');
app.use('/api/marketplace', marketplaceRoutes);

const maintenanceRoutes = require('./routes/maintenance');
app.use('/api/maintenance', maintenanceRoutes);

// Team 7 / FitCoach integration routes
// These routes remain rate-limited and API-key protected.
app.use(apiRateLimiter);
app.use(requireApiKey);

const integrationEventRoutes = require('./integration/events');
app.use('/events', integrationEventRoutes);

const integrationClubRoutes = require('./integration/clubs');
app.use('/clubs', integrationClubRoutes);

const integrationAnnouncementRoutes =
  require('./integration/announcements');
app.use('/announcements', integrationAnnouncementRoutes);

const integrationMarketplaceRoutes =
  require('./integration/marketplace');
app.use('/marketplace', integrationMarketplaceRoutes);

const profileRoutes = require('./integration/profile');
const bindingRoutes = require('./integration/bindings');

app.use('/fitcoach-users', profileRoutes);
app.use('/fitcoach-users', bindingRoutes);

// Team 5 partner trends integration
app.use('/api/partner', require('./integration/partnerTrends'));

module.exports = app;
