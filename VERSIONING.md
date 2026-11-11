# Week 13 — API Versioning Notes

## 1. Breaking Change Selected

CampusCore will change the response structure of the GET `/events` endpoint.

### Current v1 response

The endpoint currently returns an object containing an `events` array.

### New v2 response

The endpoint will return an object containing:
- `data`: the events array
- `count`: the total number of returned events

## 2. Reason for the Change

The new response structure provides a consistent data wrapper and includes the total number of returned records. This can also make it easier to add pagination metadata in future versions.

## 3. Predicted Impact on Downstream Consumer

Team 7 (FitCoach) consumes CampusCore's events endpoint.

The predicted breaking point is the consumer code that reads the `events` property from the API response, likely using `response.events`.

In v2, the array will instead be available through `response.data`. Existing code expecting `response.events` will therefore need to be updated.

**Verification limitation:** I do not have direct access to Team 7's source code, so the exact consumer line has not been independently verified. This prediction is based on CampusCore's existing API response contract.

## 4. Versioning Strategy

- Keep the existing events endpoint as v1.
- Introduce a separate v2 events endpoint.
- Preserve v1 response behaviour.
- Add deprecation headers to v1.
- Keep v1 available until after Demo Day.

## Week 13 Reflection

During this assignment, I learned why API versioning is important when an application is used by other systems. Changing an existing API response without warning can break applications that depend on it. To avoid this, I created a v2 events endpoint while keeping the existing v1 endpoint available.

One challenge was maintaining backward compatibility. I used before-and-after response snapshots and automated tests to check that the old response structure remained unchanged. I also added deprecation headers to inform consumers that v1 will eventually be retired and that v2 is its successor.

I also improved monitoring so that requests to different API versions can be identified separately. This makes it easier to observe usage and plan future changes.

For the upstream integration, I introduced a `PARTNER_VERSION` environment variable and updated the partner integration files to select the existing v1 endpoints and validate their responses. However, Team 5 had not provided an official v2 specification or deprecation notice, so I could not safely complete or verify an upstream v2 migration.

Overall, I learned that API changes require communication, testing, documentation and coordination between development teams, not just code changes.