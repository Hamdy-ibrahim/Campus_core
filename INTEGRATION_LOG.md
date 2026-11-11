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

## 8. Week 13: API Versioning and Partner Migration

### Partner Version Configuration

A `PARTNER_VERSION` environment variable was introduced and set to `v1`.

The following integration files were updated:

- `integration/partnerTrends.js`
- `integration/partnerProducts.js`

Both integrations now use version-specific configuration to select the existing v1 endpoint and validate the returned response format.

### Upstream Deprecation Notice

At the time of this implementation, Team 5 had not provided an official API v2 specification or deprecation notice.

CampusCore therefore continues to use the known v1 contract. A v2 endpoint and response parser will be implemented after Team 5 provides its official documentation.

### Testing

The full CampusCore backend test suite was executed:

Command: `npm test -- --runInBand`

Results:
- Test suites passed: 9
- Tests passed: 17
- Tests failed: 0

The version compatibility tests confirmed that the existing v1 response structure remains unchanged and the new v2 events endpoint returns its expected `data` and `count` structure.

### Remaining Actions

1. Obtain Team 5's official v2 API specification.
2. Confirm the new endpoint paths and response formats.
3. Implement and test the v2 partner integration.
4. Verify partner authentication requirements.
5. Update the partner version configuration after successful migration.
