# API Needs

## API Needs Statements

### 1. Student Profile

Team 7 needs to read a student's CampusCore profile information in order to match the student's CampusCore identity with their FitCoach account.

* Freshness: Updated when the student's profile information changes.
* Volume: Approximately once per user account setup or login.
* Auth: Authentication required because student profile information is personal.

### 2. Campus Events

Team 7 needs to read campus event information in order to display relevant campus activities to FitCoach users.

* Freshness: Updated whenever event information changes.
* Volume: Approximately once per page load or when event information is requested.
* Auth: Authentication required.

### 3. Student Clubs

Team 7 needs to read available campus club information in order to provide students with information about campus clubs and activities.

* Freshness: Updated whenever club information changes.
* Volume: Approximately once per page load.
* Auth: Authentication required.

### 4. Campus Announcements

Team 7 needs to read campus announcements in order to provide FitCoach users with relevant university information and updates.

* Freshness: Updated whenever a new announcement is posted or an existing announcement changes.
* Volume: Approximately once per page load.
* Auth: Authentication required.

### 5. Marketplace Listings and Prices

Team 7 needs to read active CampusCore marketplace listings and their prices in order to provide information about products available to students through the campus marketplace.

* Freshness: Updated regularly to reflect changes to active listings and prices.
* Volume: Approximately once per page load or when marketplace information is requested.
* Auth: Authentication required.

### 6. Student Activity

Team 7 needs to read a student's CampusCore activity information in order to provide relevant information about the student's campus engagement.

* Freshness: Updated regularly to reflect recent student activity.
* Volume: Approximately once per user session.
* Auth: Authentication required because the information is student-specific.

## Week 1 Audit Check

The needs identified above were compared with the CampusCore Week 1 resource and action audit. Student information, clubs, events, announcements, and marketplace listings are resources already managed by CampusCore. Marketplace listings can contain prices because sellers specify prices for items they want to sell. However, CampusCore does not currently have general billing categories, club membership fees, event ticket prices, or a dedicated student transaction history. These requirements were identified in Team 7's description but do not currently map to CampusCore resources, so they are flagged as gaps rather than being assumed as existing functionality.

## Reflection

The partner requirements showed us that the downstream team's needs do not always match the resources currently available in CampusCore. Team 7 described several spending-related features, including club fees, event prices, billing categories, and transaction history, but CampusCore does not currently charge students for clubs or events and does not maintain a general billing or transaction system. The marketplace is the main CampusCore feature where prices are stored because sellers can specify prices for their listings. This helped us understand the importance of checking our partner's requirements against our actual application resources before designing the API, rather than creating endpoints for information that our application does not currently provide.
