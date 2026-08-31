# ENDPOINT_LIST

| Method | Path | Purpose | Maps to Need / Action |
|---|---|---|---|
| GET | `/fitcoach users/{fitcoach usersID}/profile` | Return a specific student's core profile information | Team 7 needs to read a student’s CampusCore profile information in order to match the student’s CampusCore identity with their FitCoach account. |
| POST | `/fitcoach users/{fitcoach usersID}/fitcoach-bindings` | Create a linkage between a student's CampusCore identity and FitCoach account | Write action required to fulfill the connection established in Need 1. |
| GET | `/events` | Return a list of campus event information | Team 7 needs to read campus event information in order to display relevant campus activities to FitCoach users. |
| GET | `/clubs` | Return a list of available campus club information | Team 7 needs to read available campus club information in order to provide FitCoach users with information about campus clubs and activities. |
| GET | `/announcements` | Return a list of campus announcements and updates | Team 7 needs to read campus announcements in order to provide FitCoach users with relevant university information and updates. |
| GET | `/marketplace/listings?status=active` | Return active marketplace listings including their prices | Team 7 needs to read active CampusCore marketplace listings and their prices in order to provide information about products available to FitCoach users through the campus marketplace. |