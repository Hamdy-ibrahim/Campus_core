
const express = require('express');
const request = require('supertest');

process.env.API_KEYS = 'test-key-123';


const requireApiKey = require('../middleware/apiKeyAuth');

describe('API key authentication', () => {
  const app = express();

  app.use(requireApiKey);

  app.get('/protected', (req, res) => {
    res.status(200).json({ message: 'Access granted' });
  });

  test('rejects a request with no API key', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).toBe(401);
  });

  test('rejects an invalid API key', async () => {
    const response = await request(app)
      .get('/protected')
      .set('X-API-Key', 'wrong-key');

    expect(response.status).toBe(401);
  });

  test('allows a request with a valid API key', async () => {
    const response = await request(app)
      .get('/protected')
      .set('X-API-Key', 'test-key-123');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Access granted');
  });
});
