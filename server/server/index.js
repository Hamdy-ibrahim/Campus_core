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

// Signup
const signupRoutes = require('./routes/signup');
app.use('/api/signup', signupRoutes);

// Events
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

// Clubs
const clubRoutes = require('./routes/clubs');
app.use('/api/clubs', clubRoutes);

// Announcements
const announcementRoutes = require('./routes/announcements');
app.use('/api/announcements', announcementRoutes);

// Marketplace
const marketplaceRoutes = require('./routes/marketplace');
app.use('/api/marketplace', marketplaceRoutes);

const maintenanceRoutes = require("./routes/maintenance");
app.use("/api/maintenance", maintenanceRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});