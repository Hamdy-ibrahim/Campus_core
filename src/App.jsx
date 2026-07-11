import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import ItemDetails from "./pages/ItemDetails";
import SellItem from "./pages/SellItem";
import Announcements from "./pages/Announcements";
import Maintenance from "./pages/Maintenance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/club-details" element={<ClubDetails />} />
      <Route path="/event-details/:id" element={<EventDetails />} />
      <Route path="/events" element={<Events />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/:id" element={<ItemDetails />} />
      <Route path="/sell-item" element={<SellItem />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  );
}

export default App;