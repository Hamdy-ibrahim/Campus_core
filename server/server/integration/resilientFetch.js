
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, config = {}) {
  const {
    timeoutMs = 1500,
    retries = 2,
    delayMs = 200,
  } = config;

  const method = (options.method || 'GET').toUpperCase();

  // Only retry GET requests.
  const maxRetries = method === 'GET' ? retries : 0;

  for (let attempt = 0; ; attempt++) {
    let wait = delayMs * 2 ** attempt;

    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(timeoutMs),
      });

      // Return immediately if the response is successful
      // or its status is not one of the retryable statuses.
      if (
        !RETRY_STATUSES.has(response.status) ||
        attempt >= maxRetries
      ) {
        return response;
      }

      // Respect Retry-After for HTTP 429 responses.
      const retryAfter = Number(
        response.headers.get('Retry-After')
      );

      if (response.status === 429 && retryAfter > 0) {
        wait = Math.min(retryAfter * 1000, 5000);
      }
    } catch (error) {
      // Retry network errors and timeouts, but stop
      // when the retry limit has been reached.
      if (attempt >= maxRetries) {
        throw error;
      }
    }

    console.warn(
      `Attempt ${attempt + 1} failed. Retrying in ${wait} ms.`
    );

    await sleep(wait);
  }
}

module.exports = { fetchWithRetry };
