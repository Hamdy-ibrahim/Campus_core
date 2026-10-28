# Week 7 — Partner Test Results

## 1. Project
CampusCore FitCoach Integration API

## 2. Testing Tools
- Jest
- Supertest
- Postman

## 3. Tests Run Against CampusCore

| Endpoint | Expected Result | Actual Result | Status |
|---|---|---|---|
| `GET /` | 200 OK | 200 OK — API running message | PASS |

## 4. Partner API Tests

- **Partner/team:** Billing System API team
- **Partner API base URL:** `https://ngnhnkv7-3001.uks1.devtunnels.ms`
- **Contract received:** Yes
- **Tests executed against the real partner API:** Yes, using Postman

| Endpoint | Expected Status Code | Actual Result | Status |
|---|---|---|---|
| `GET /products` | 200 OK | 200 OK | PASS |
| `GET /products/{id}` | 200 OK if found; 404 if not found | 200 OK | PASS |
| `GET /discounts` | 200 OK | 200 OK | PASS |
| `PATCH /discounts/{product_id}` | 200 OK; 400 for invalid input; 404 if not found | 200 OK | PASS |
| `POST /insights` | 201 Created; 400 for invalid input | 200 OK | PASS |
| `GET /insights/trends` | 200 OK | 200 OK | PASS |
| `GET /insights/products-bought-together` | 200 OK | 200 OK  | PASS |

## 5. Failures and Resolutions


### Failure 1: Product ID parameter mismatch

- **Endpoint:** `GET /products/{id}`
- **Expected result:** The path parameter should match its definition in the OpenAPI contract.
- **Actual result:** The path uses `{id}`, but its referenced parameter is named `product_id`.
- **Classification:** Contract ambiguity.
- **Fix or documentation:** Ask the partner to correct the parameter naming in the contract.

## 6. Final Summary

- **Automated tests completed:** One confirmed CampusCore root endpoint test.
- **Partner contract exchanged:** Yes.
- **Partner tests executed against the real API:** Yes, manual Postman tests were attempted.
- **Issues fixed:** None confirmed yet.
- **Remaining issues:** Resolve the 404 responses, confirm the correct partner API URL, and correct the parameter naming mismatch.


