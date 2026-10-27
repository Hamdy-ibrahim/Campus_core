# Week 9: CampusCore API Security Audit

## 1. Purpose

This audit reviews CampusCore's API security following the implementation of API-key authentication and rate limiting. The review covers sensitive data exposure, unauthorized access, error responses, write endpoints, and API-key storage.

## 2. API-Key Authentication

- Protected endpoints use the `X-API-Key` request header.
- Requests with a missing or invalid key are rejected with HTTP `401 Unauthorized`.
- A valid configured key allows the request to proceed.
- API keys are configured through environment variables rather than hardcoded in route handlers.
- The root health endpoint is public and is used to check whether the API is running.

**Evidence:** API-key authentication tests passed for missing, invalid, and valid keys.

## 3. Rate Limiting

- Rate limiting is applied to API requests.
- The configured default limit is 100 requests per minute.
- Requests exceeding the limit receive HTTP `429 Too Many Requests`.
- The response includes a `Retry-After` header and a JSON error message.
- The limit helps reduce accidental or excessive request traffic.

**Evidence:** Rate-limiter tests passed, including the limit-exceeded response.

## 4. Sensitive Data Exposure

Review user, profile, signup, and integration responses to ensure they return only fields required by their API contracts.

- Passwords and password hashes must not appear in API responses.
- API keys and verification tokens must not be returned unnecessarily.
- Internal database fields should not be exposed without a clear requirement.

**Finding:** Record the specific routes inspected and any issues fixed before marking this section complete.

## 5. Unauthorized Data Access

Review routes that retrieve data by an identifier. Confirm that changing an identifier cannot expose another user's private information where access restrictions are required.

**Finding:** Record the routes and tests used to verify access restrictions. API-key authentication identifies a configured caller but does not, by itself, prove that the caller is authorized to access every user's data.

## 6. Error Responses

Check that errors do not expose stack traces, filesystem paths, database credentials, SQL queries, or unnecessary internal implementation details.

- Expected authentication failures return HTTP `401`.
- Rate-limit failures return HTTP `429` with a retry instruction.
- Database and unexpected server errors should return safe, general messages to clients.

**Finding:** Record any unsafe error responses discovered and the corresponding fixes.

## 7. Write Endpoint Validation

Review POST, PUT, and PATCH handlers to ensure they accept only permitted fields. Extra fields such as `isAdmin`, internal IDs, or ownership fields must not be accepted without authorization and validation.

**Finding:** Record the write endpoints tested and whether unexpected fields were rejected or ignored.

## 8. API-Key Storage

- Real keys belong in local environment configuration or the deployment environment.
- `.env` must be excluded from Git.
- `.env.example` should contain placeholder values only.
- Real keys must not appear in source code, README files, logs, screenshots, or committed files.
- If a key is exposed, it should be rotated.

**Finding:** Verify Git tracking and repository history before declaring this check complete.

## 9. Summary

API-key authentication and rate limiting have been implemented and their automated tests passed. The remaining audit findings must be based on actual inspection of response payloads, access controls, write validation, error handling, and repository secret storage.

## 10. Limitations

This audit records checks performed for the course project. Passing automated tests does not establish that every endpoint is free from security vulnerabilities. Further review is required when routes or authentication behavior change.
