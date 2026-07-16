# 🎓 CampusCore – University Student Management System

## 📖 Project Overview

CampusCore is a modern web-based university student management platform developed to simplify and improve campus life by bringing multiple student services together into one centralized system.

The system allows students to discover and join clubs, register for campus events, access announcements, buy and sell items through a marketplace, and submit maintenance requests. Administrators can manage all campus activities through a dedicated administration dashboard.
---

# 🎯 Project Objectives

The main objective of CampusCore is to:

- Simplify communication between students and the university.
- Improve student participation in campus activities.
- Provide one platform for campus services.
- Allow administrators to efficiently manage clubs, events and announcements.
- Create an easy-to-use and responsive student portal.

---

# 👥 User Roles

The system supports two types of users:

## Student

Students can:

- Register an account
- Login securely
- View their personal dashboard
- Join student clubs
- Register for campus events
- View event and club details
- Browse the marketplace
- View announcements
- Submit maintenance requests
- View their personal profile and activity

---

## Administrator

Administrators can:

- Login through the admin portal
- Create clubs
- Delete clubs
- Create campus events
- Delete events
- Post announcements
- Manage marketplace listings
- Monitor students and campus activities

---

# ✨ Features

## 🏛 Student Clubs

- Browse available clubs
- Search clubs
- Filter clubs by category
- View club details
- Join clubs
- Automatic updating of joined club count

---

## 📅 Campus Events

- Browse campus events
- Search events
- View event details
- Register for events
- Automatic updating of registered event count

---

## 📢 Announcements

Students can view:

- University notices
- Academic announcements
- Campus updates

Administrators can:

- Post announcements
- Delete announcements

---

## 🛒 Marketplace

Students can:

- Browse marketplace items
- View listings

Administrators can:

- Add new items
- Delete marketplace items

---

## 🛠 Maintenance Requests

Students can submit maintenance requests regarding:

- Electrical faults
- Internet issues
- Hostel repairs
- Classroom maintenance

---

## 👤 Student Profile

Displays:

- Student information
- Joined clubs
- Registered events
- Marketplace activity
- Maintenance requests

---

## 📊 Student Dashboard

Provides an overview of:

- Joined clubs
- Registered events
- Marketplace items
- Announcements
- Upcoming events
- Quick navigation shortcuts

---

## 🛡 Administrator Dashboard

Displays:

- Total students
- Total clubs
- Total events
- Marketplace listings
- Announcements
- Maintenance requests

---

# 🖥 Technologies Used

- React.js
- Vite
- JavaScript (ES6)
- HTML5
- CSS3
- React Router DOM
- Local Storage API
- Font Awesome Icons

---

# 📂 Project Structure

```
src
│
├── assets
│   └── images
│
├── components
│   ├── Sidebar.jsx
│   ├── AdminSidebar.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── Clubs.jsx
│   ├── ClubDetails.jsx
│   ├── Events.jsx
│   ├── EventDetails.jsx
│   ├── Marketplace.jsx
│   ├── Maintenance.jsx
│   ├── Announcements.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminClubs.jsx
│   ├── AdminEvents.jsx
│   ├── AdminMarketplace.jsx
│   ├── AdminAnnouncements.jsx
│
├── styles
│
├── App.jsx
└── main.jsx
```

---

# 💾 Data Storage

This project uses the browser's **Local Storage** instead of a backend database.

Stored information includes:

- Registered users
- Clubs
- Events
- Joined clubs
- Registered events
- Announcements
- Marketplace items
- Maintenance requests

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/CampusCore.git
```

---

## Navigate into the project

```bash
cd CampusCore
```

---

## Install dependencies

```bash
npm install
```

---

## Start the development server

```bash
npm run dev
```

---

The application will run at:

```
http://localhost:5173
```

---

# 📌 System Workflow

### Student

```
Sign Up
      ↓
Login
      ↓
Dashboard
      ↓
Browse Clubs
      ↓
Join Club
      ↓
Browse Events
      ↓
Register Event
      ↓
View Profile
```

---

### Administrator


```
Login - use email "admin@campuscore.com" pass "admin123"
     ↓
Dashboard
     ↓
Create Clubs
     ↓
Create Events
     ↓
Post Announcements
     ↓
Manage Marketplace
```

---

# 🧪 Testing

The following functionalities were tested:

- Student Registration
- Student Login
- Administrator Login
- Club Creation
- Club Deletion
- Event Creation
- Event Registration
- Marketplace Management
- Announcement Management
- Maintenance Requests
- Dashboard Statistics
- Profile Statistics
- Local Storage Persistence

---

# 📈 Future Improvements

Future versions of CampusCore may include:

- Backend database integration (MySQL/MongoDB)
- User profile editing
- Email notifications
- Real-time announcements
- File uploads
- Club image uploads
- Event image uploads
- Student messaging
- Payment integration
- Mobile application
- Push notifications
- Dark mode

# 📄 License

This project was developed for academic purposes only.

© 2026 CampusCore Project Team. All Rights Reserved.