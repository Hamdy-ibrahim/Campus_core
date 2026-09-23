const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'CampusCore API is running'
  });
});

// Existing signup route
const signupRoutes = require('./routes/signup');
app.use('/api/signup', signupRoutes);

// Week 5 GET routes
const profileRoutes = require('./routes/profile');
const eventsRoutes = require('./routes/events');
const clubsRoutes = require('./routes/clubs');
const announcementsRoutes = require('./routes/announcements');
const marketplaceRoutes = require('./routes/marketplace');

app.use('/fitcoach-users', profileRoutes);
app.use('/events', eventsRoutes);
app.use('/clubs', clubsRoutes);
app.use('/announcements', announcementsRoutes);
app.use('/marketplace', marketplaceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});