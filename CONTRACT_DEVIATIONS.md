# Contract Deviations

## Week 5 — GET Endpoint Implementation

The Week 5 GET endpoints were implemented using data stored in the CampusCore MySQL database and mapped to the response structures defined in the Week 4 OpenAPI contract.

### Deviations Identified

1. **Identifier format**

The existing CampusCore frontend/database uses integer IDs for events, clubs, announcements, and marketplace listings, while the Week 4 OpenAPI contract specifies UUID-formatted identifiers for these resources.

The existing integer IDs were retained in the database rather than changing the existing application data model. The API currently converts these IDs to strings when constructing the response.

2. **Event date/time**

The existing event data primarily stores the event date, while the Week 4 contract requires a `start_time` date-time field. The API maps the available event date/time information into the required date-time response field.

3. **Marketplace price**

The frontend displays marketplace prices in a formatted string such as `KSh 45,000`. The database/API stores the price as a numeric value (`45000`) and provides the currency separately as `KES`, matching the OpenAPI contract's numeric `price` field and `currency` field.

## Verification

All five Week 5 GET endpoints were tested through Swagger UI and checked against the Week 4 OpenAPI response structures.
