# Week 11: Resilience Testing Notes

## 1. Testing Results

The CampusCore integration was tested using a local mock partner running on port 4000.

| Test | Partner behaviour | CampusCore result |
|---|---|---|
| Normal (`ok`) | Returned task data | Successfully received two tasks |
| Slow (`slow`) | Delayed response by 10 seconds | Timed out after approximately 1.55 seconds |
| Flaky (`flaky`) | First two requests returned 503; third succeeded | Retried and successfully received the tasks |
| Server error (`error`) | Returned HTTP 500 | Returned previously saved data when available |
| No saved data | Partner returned HTTP 500 after backend restart | Returned HTTP 502 with "Partner data unavailable" |
| Partner stopped | Not yet tested | Pending |

## 2. Timeout and Retry Configuration

- Timeout: 1,500 milliseconds (1.5 seconds).
- Maximum retries: 2 retries after the initial request.
- First retry delay: 200 milliseconds.
- Second retry delay: 400 milliseconds.
- Maximum retryable attempts: 3.
- Retryable HTTP statuses: 429, 500, 502, 503 and 504.
- Only GET requests are retried. Other request methods are not retried.

The maximum theoretical waiting time is approximately 5,100 milliseconds (5.1 seconds), excluding small processing overheads. This consists of three 1,500-millisecond attempts and two retry delays of 200 and 400 milliseconds.

## 3. Graceful Fallback

CampusCore stores the most recent successful response in memory, together with its timestamp.

When the partner becomes unavailable, CampusCore returns the saved data with `stale: true` and the original `asOf` timestamp. If no saved data exists, CampusCore returns HTTP 502 with a friendly unavailable message.

The saved data is held in memory and is lost when the backend restarts.

## 4. User Impact

Without resilience handling, users may experience long waits or error messages when the partner service is slow or unavailable. The timeout prevents CampusCore from waiting indefinitely for a response. Retry logic allows temporary failures to recover automatically without requiring the user to refresh repeatedly. Graceful fallback allows previously retrieved information to remain available during partner downtime. When no saved data is available, CampusCore displays a clear unavailable response instead of crashing.

## 5. Circuit Breaker

A circuit breaker temporarily stops requests to a failing partner after repeated failures, then allows a test request after a recovery period. It was not implemented in this lab.

## 6. Live Integration Verification

After mock testing, the original Team 5 partner URL was restored in the environment configuration. The CampusCore Admin Dashboard was checked, and product trends and product catalogue data were displaying again.

**Note:** The retry and fallback behaviour was verified using the temporary `/api/partner/resilience-test` route. The real partner integration still needs to be checked for use of the reusable retry and fallback logic before final submission.