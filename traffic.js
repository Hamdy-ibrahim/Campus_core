
const API = process.env.API || 'http://localhost:5000';
const KEY = process.env.KEY;
const N = Number(process.env.N || 60);

if (!KEY) {
  console.error('Please set the KEY environment variable in PowerShell.');
  process.exit(1);
}

const mix = [
  // Successful requests
  { method: 'GET', path: '/events', key: true },
  { method: 'GET', path: '/events', key: true },
  { method: 'GET', path: '/events', key: true },

  // Rejected requests
  { method: 'GET', path: '/events', key: false },
  { method: 'GET', path: '/events', key: 'invalid' },

  // A valid key, but a path that should not exist
  { method: 'GET', path: '/not-a-real-route', key: true }
];

const pause = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const counts = {};

  for (let i = 0; i < N; i++) {
    const request = mix[Math.floor(Math.random() * mix.length)];

    try {
      const headers = {};

      if (request.key === true) {
        headers['X-API-Key'] = KEY;
      } else if (request.key === 'invalid') {
        headers['X-API-Key'] = 'invalid-test-key';
      }

      const response = await fetch(API + request.path, {
        method: request.method,
        headers
      });

      counts[response.status] =
        (counts[response.status] || 0) + 1;

      // Read and discard the response body.
      await response.text();

    } catch (error) {
      counts.failed = (counts.failed || 0) + 1;
    }

    await pause(100);
  }

  console.log('Traffic generation complete.');
  console.log('Requests sent:', N);
  console.log('Status codes received:', counts);
})();
