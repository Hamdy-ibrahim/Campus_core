# CampusCore API v1 Deprecation Notice

**To:** Team 7 — FitCoach Integration Team  
**From:** CampusCore API Team  
**Date:** 11 November 2026  
**Subject:** Notice of CampusCore API v1 Deprecation

Hello Team 7,

CampusCore is introducing API version 2 (v2) to improve response consistency and support future API improvements.

The events endpoint has a breaking response-format change:

- **Current v1:** `GET /v1/events` returns `{ "events": [...] }`.
- **New v2:** `GET /v2/events` returns `{ "data": [...], "count": 3 }`.

Your integration should update its event response parser from `response.events` to `response.data`. The v2 response also provides a `count` field.

**Migration timeline:** CampusCore v1 will remain available through Demo Day. The planned sunset date is 30 November 2026.

The v1 endpoint includes `Deprecation`, `Sunset`, and `Link` response headers to help identify the replacement endpoint.

Please migrate and test your integration against v2 before the sunset date.

Thank you,  
CampusCore API Team
