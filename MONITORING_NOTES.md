# Week 12: CampusCore API Monitoring Notes

## 1. Predictions Before Testing

Based on the monitoring implementation, I expected:

- Successful requests with valid API keys to return HTTP 200.
- Requests without valid API keys to return HTTP 401.
- Requests to nonexistent endpoints to return HTTP 404.
- Requests exceeding the rate limit to return HTTP 429.
- Server errors (5xx) to remain at zero during normal testing.
- Response times to be recorded in milliseconds.
- API keys not to appear in the monitoring logs.

## 2. Monitoring Implementation

I implemented monitoring middleware in `server/server/monitoring.js`.

The middleware records:
- Timestamp
- HTTP method
- Request path without query parameters
- HTTP response status
- Response time in milliseconds
- Caller fingerprint

The middleware runs before authentication and rate limiting so that rejected requests are also recorded.

The `/stats` endpoint provides:
- Total requests
- Client errors (4xx)
- Server errors (5xx)
- Server error rate
- Average response time
- Per-route request counts and response times

## 3. Traffic Generation Results

I used `traffic.js` to generate 60 requests against the CampusCore API.

| HTTP status | Requests | Percentage |
|---|---:|---:|
| 200 OK | 27 | 45.0% |
| 401 Unauthorized | 23 | 38.3% |
| 404 Not Found | 10 | 16.7% |
| **Total** | **60** | **100%** |

The 401 responses came from requests with missing or invalid API keys. The 404 responses came from requests to a deliberately nonexistent endpoint.

## 4. Measured Monitoring Statistics

The `/stats` endpoint reported the following results after the traffic test:

| Metric | Measured result |
|---|---:|
| Total requests | 67 |
| Client errors | 35 |
| Server errors | 0 |
| Server error rate | 0% |
| Average response time | 5.3 ms |

### Route statistics

| Route | Requests | Average response time | Maximum response time |
|---|---:|---:|---:|
| GET / | 1 | 9.7 ms | 9.7 ms |
| GET /events/ | 28 | 10.4 ms | 158.4 ms |
| GET (no route) | 35 | 1.5 ms | 3.4 ms |
| GET /stats | 3 | 2.1 ms | 2.3 ms |

The total includes earlier test requests and monitoring endpoint requests, not only the 60 generated requests.

## 5. Rate Limiting Test

I temporarily reduced the rate limit to 5 requests per minute for testing.

I sent six requests without an API key.

| Request | HTTP status |
|---|---:|
| 1 | 401 |
| 2 | 401 |
| 3 | 401 |
| 4 | 401 |
| 5 | 401 |
| 6 | 429 |

This confirmed that the rate limiter blocks requests after the configured limit is reached.

The normal limit was then restored to 100 requests per minute.

## 6. Hypothesis and Findings

My hypothesis was that the monitoring middleware would record both successful and unsuccessful requests without exposing API keys.

The results supported this hypothesis. Successful requests, authentication failures, nonexistent routes and rate-limited requests produced the expected HTTP statuses.

The generated traffic produced no server errors. The average response time was 5.3 ms during the measured statistics test.

One request to the events route reached a maximum response time of 158.4 ms, which could be investigated if similar delays occur repeatedly.

## 7. Production Alert Threshold

For production monitoring, I would configure an alert when the server error rate exceeds 5% for five consecutive minutes.

The team should investigate:
- Database connection problems.
- Partner API availability.
- Backend exceptions.
- Slow API responses.

The team should also check whether the Week 11 partner API retry and fallback mechanisms are working correctly.

## 8. Conclusion

The CampusCore monitoring middleware successfully recorded request information, response statuses and response times.

The statistics endpoint returned aggregated monitoring data, and the rate-limiting test confirmed that HTTP 429 responses could be generated.

The tests demonstrated that the API can monitor successful requests, client errors and rate-limit responses without displaying the actual API key in the logs.