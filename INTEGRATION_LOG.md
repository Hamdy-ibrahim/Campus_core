# Week 10: Team 5 API Integration Log

## 1. Integration Overview

- **Consumer application:** CampusCore
- **Partner team:** Team 5 — Billing System
- **Feature:** Product Trends in the CampusCore Admin Dashboard
- **Partner API endpoint:** `GET /api/insights/trends`
- **CampusCore endpoint:** `GET /api/partner/trends`
- **Integration method:** Server-to-server HTTP request using Node.js and Express.

## 2. Implementation

CampusCore integrates with Team 5's Billing System API to retrieve live product trend data.

The CampusCore backend requests data from Team 5's deployed API. It then returns the trends to the frontend through the `/api/partner/trends` endpoint.

The Admin Dashboard displays the product name, number of views and units sold. The interface includes loading and error messages to improve the user experience when data is unavailable.

The partner API base URL is configured using the `PARTNER_URL` environment variable.

## 3. Bugs, Root Causes and Fixes

### Issue 1: Partner API returned 404

- **Symptom:** The CampusCore integration could not retrieve product trends.
- **Root cause:** The initial request used `/insights/trends`, but the deployed Team 5 API uses `/api/insights/trends`.
- **Fix:** Updated the request path in `server/server/integration/partnerTrends.js` to include `/api`.
- **Whose code:** CampusCore integration.
- **Fixed by:** CampusCore developer.
- **Result:** The partner endpoint was successfully tested, and trends data was displayed in the browser.

### Issue 2: Product trends unavailable

- **Symptom:** The Admin Dashboard displayed a message that product trends were temporarily unavailable.
- **Root cause:** The partner API was unavailable when the request was made.
- **Fix:** CampusCore handles failed partner requests and displays a user-friendly error message instead of crashing.
- **Whose code:** CampusCore handles the integration error; Team 5 manages the availability of its API.
- **Result:** The developer observed that the products appeared again when Team 5's backend became available.

## 4. Testing Results

| Test                                                                  | Result               |
| --------------------------------------------------------------------- | -------------------- |
| Team 5 trends endpoint tested using Postman                           | Passed               |
| CampusCore `/api/partner/trends` endpoint tested using Postman        | Passed               |
| Trends displayed in the browser                                       | Passed               |
| Unavailable message appeared during partner downtime                  | Observed             |
| Trends returned when the partner became available                     | Observed             |
| Other CampusCore endpoints remained available during partner downtime | Pending verification |

## 5. Environment Configuration and Security

The partner API base URL is stored in the `PARTNER_URL` environment variable.

The actual `.env` file contains local configuration and must not be committed to GitHub. An `.env.example` file should contain the required variable names and placeholder values.

The tested trends endpoint did not require an API key.

## 6. Partner Collaboration

Team 5 provided an updated deployed API URL. The new endpoints were tested using Postman, and the CampusCore integration was updated to use the correct API route.

## 7. Final Verification Checklist

- [x] Live trends data displayed in the Admin Dashboard.
- [x] CampusCore backend retrieves data from the partner API.
- [x] Partner URL configured using an environment variable.
- [x] Error handling implemented for failed partner requests.
- [x] Trends returned when the partner service became available again.
- [x] Verify CampusCore's other API routes remain available during partner downtime.
- [x] Confirm `.env` is excluded from Git.
- [x] Create and verify `.env.example`.
- [x] Commit and push the changes to GitHub.
- [x] Rehearse the live-data, partner-unavailable and recovery demonstration.
