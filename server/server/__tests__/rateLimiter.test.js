
const express = require('express');
const request = require('supertest');

process.env.RATE_LIMIT_WINDOW_MS = '60000';
process.env.RATE_LIMIT_MAX = '3';

// Load the limiter after setting the test limit.
const rateLimiter = require('../middleware/rateLimiter');

describe('API rate limiting', () => {
  test('allows three requests and rejects the fourth', async () => {
    const app = express();

    app.use(rateLimiter);
    app.get('/test', (req, res) => {
      res.status(200).json({ message: 'OK' });
    });

    const first = await request(app).get('/test');
    const second = await request(app).get('/test');
    const third = await request(app).get('/test');
    const fourth = await request(app).get('/test');

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(third.status).toBe(200);
    expect(fourth.status).toBe(429);
    expect(fourth.body.error).toBe('Too Many Requests');
    expect(fourth.headers['retry-after']).toBeDefined();
  });
});
