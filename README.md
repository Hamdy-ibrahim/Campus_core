# CampusCore — University Student Management System

CampusCore is a web-based university platform that brings student services and campus activities together in one place. This repository contains the React frontend and Express backend, with MySQL database integration and API endpoints for campus services and FitCoach integration.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [API Access](#api-access)
- [API Endpoints](#api-endpoints)
- [Running the Project Locally](#running-the-project-locally)
- [Testing the API](#testing-the-api)
- [Integration Notes for Team 7](#integration-notes-for-team-7)
- [Troubleshooting](#troubleshooting)
- [Project Status](#project-status)

## Project Overview

CampusCore simplifies campus life by providing a central platform where students can discover clubs, register for events, view announcements, browse marketplace listings, and submit maintenance requests.

Administrators can manage campus activities through an administration dashboard.

The project is developed for academic purposes and is being integrated with external team APIs as part of the API integration coursework.

## Key Features

### Student Services

- Student registration and login.
- Student dashboard and profile.
- Club discovery and membership.
- Campus event discovery and registration.
- University announcements.
- Marketplace browsing.
- Maintenance request submission.

### Administration

- Administrative dashboard and campus statistics.
- Club and event management.
- Announcement management.
- Marketplace listing management.
- Overview of student and campus activities.

Feature availability may vary while the frontend and backend integration work continues.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Navigation | React Router DOM |
| Styling | CSS3, HTML5 |
| Backend | Node.js, Express |
| Database | MySQL |
| API communication | HTTP/JSON |
| External integration | Team APIs via REST endpoints |

## Architecture

CampusCore consists of three main parts:

1. **Frontend:** The React application used by students and administrators.
2. **Backend:** The Express API that exposes CampusCore application and integration routes.
3. **Database:** MySQL for backend data storage.

Some frontend features may still use browser Local Storage while the database-backed implementation is being completed.

## API Access

### Current public development base URL

```text
https://q0gsrxw1-5000.inc1.devtunnels.ms
```

Use this base URL when testing the currently running CampusCore API remotely.

**Availability notice:** This is a development tunnel, not a permanently hosted production API. The backend must be running on the developer's computer, and the tunnel must remain active. The URL may change if the tunnel is recreated.

### Base endpoint

**Request**

```http
GET /
```

**Expected response**

```json
{
  "message": "CampusCore API is running"
}
```

This endpoint is useful for checking whether the backend is reachable.

## API Endpoints

The backend exposes the following route groups.

### CampusCore application routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/signup` | Student registration |
| GET | `/api/events` | Campus events |
| GET | `/api/clubs` | Student clubs |
| GET | `/api/announcements` | Campus announcements |
| GET | `/api/marketplace/listings?status=active` | Active marketplace listings |
| GET | `/api/partner/trends` | Retrieves product trends from the Team 5 API |

### FitCoach integration routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/events` | Provides event data for integration |
| GET | `/clubs` | Provides club data for integration |
| GET | `/announcements` | Provides announcement data for integration |
| GET | `/marketplace` | Provides marketplace data for integration |
| GET | `/fitcoach-users/{fitcoach_userId}/profile` | Retrieves the mapped CampusCore user profile |
| POST | `/fitcoach-users/{fitcoach_userId}/fitcoach-bindings` | Creates a FitCoach user binding |

Replace `{fitcoach_userId}` with the relevant identifier. Consult the project's OpenAPI contract for exact request fields, response schemas, status codes, and any additional constraints.

The route paths above reflect the current Express route registrations. They do not imply that every possible request or response has been independently verified.

## Running the Project Locally

### Prerequisites

Install the following:

- Node.js and npm.
- MySQL Server.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/Hamdy-ibrahim/Campus_core.git
cd Campus_core
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Configure the backend environment

Open the `server/server` directory and configure the `.env` file with the required database connection settings and integration variables.

For the Team 5 integration, the partner base URL is:

```env
PARTNER_URL=https://ngnhnkv7-3001.uks1.devtunnels.ms
```

Configure the MySQL variables according to the backend's existing database connection code. Do not commit `.env` files, passwords, or other secrets to GitHub.

### 4. Start the backend

Open a terminal:

```bash
cd server/server
npm install
npm run dev
```

The backend normally runs at:

```text
http://localhost:5000
```

Keep this terminal running while testing the API.

### 5. Start the frontend

Open a separate terminal in the repository root:

```bash
npm run dev
```

Open the local frontend address printed by Vite, usually:

```text
http://localhost:5173
```

The frontend and backend run separately, so both must be started when working locally.

## Testing the API

You can test GET endpoints in a browser or use Postman for more complete testing.

For example, test the public backend health endpoint:

```http
GET https://q0gsrxw1-5000.inc1.devtunnels.ms/
```

For an endpoint that requires a request body, use Postman and follow the request schema in the OpenAPI contract.

When testing, verify:

- The HTTP status code.
- The response body and its data types.
- Error responses for invalid requests.
- Whether the endpoint is reachable through the public tunnel.
- Whether the response matches the documented contract.

## Integration Notes for Team 7

Use the following base URL for current remote integration testing:

```text
https://q0gsrxw1-5000.inc1.devtunnels.ms
```

To construct a request URL, append the required endpoint path. For example:

```text
GET https://q0gsrxw1-5000.inc1.devtunnels.ms/events
```

Before integration testing:

1. Confirm that the base URL returns the CampusCore API health response.
2. Confirm the required endpoint path and HTTP method in the OpenAPI contract.
3. Send requests using the field names and data types specified in the contract.
4. Check the actual response status and JSON body.
5. Report any unexpected response with the request URL, HTTP method, status code, and response body. Do not include credentials or secrets.

No API key is currently configured for the Team 5 trends request in the CampusCore backend. Follow the shared API contract for the authentication requirements of other endpoints rather than assuming every endpoint uses the same authentication mechanism.

## Troubleshooting

| Problem | What to check |
|---|---|
| Connection refused | Check that the backend is running on port 5000. |
| Public tunnel unavailable | Check that the Dev Tunnel is active and points to port 5000. |
| 404 Not Found | Verify the endpoint path and HTTP method. |
| 500 Internal Server Error | Check backend logs and database configuration. |
| Partner integration error | Verify `PARTNER_URL`, the partner endpoint, and the partner's availability. |
| Unexpected response | Compare the response with the OpenAPI contract. |

## API Security — Week 9

### Authentication

CampusCore protects its application and integration endpoints using API-key authentication. Send the key in the `X-API-Key` request header.

Example request:

```bash
curl -i -H "X-API-Key: <your-api-key>" \
  http://localhost:5000/events
```

Replace the placeholder with a configured key. Never commit real API keys to source control.

### Authentication errors

A request with a missing or invalid API key returns HTTP `401 Unauthorized`.

```json
{
  "error": "Unauthorized",
  "message": "A valid X-API-Key header is required"
}
```

### Rate limiting

The API is configured for a default limit of 100 requests per minute. Requests exceeding the configured limit return HTTP `429 Too Many Requests`, include a `Retry-After` header, and provide a JSON error response.

### Environment configuration

Configure the following variables in the backend environment:

- `API_KEYS` — comma-separated keys accepted by CampusCore.
- `RATE_LIMIT_WINDOW_MS` — rate-limit window in milliseconds.
- `RATE_LIMIT_MAX` — maximum requests per window.
- `PARTNER_URL` — base URL of the upstream partner API.

If the upstream API requires a key, configure its key using the variable expected by the integration code. Keep real values in `.env` or the deployment environment; use placeholders in `.env.example`.

### Local setup

From the backend directory:

```bash
npm install
npm test
npm start
```

Configure the database and required environment variables before starting the server. Do not commit `.env`.

### Security limitations

The rate limiter uses in-memory state and resets when the server restarts. API-key authentication alone does not provide user-specific authorization.


## License

Developed for academic purposes.

© 2026 CampusCore Project Team. All rights reserved.
