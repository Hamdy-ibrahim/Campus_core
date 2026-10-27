
process.env.API_KEYS = 'test-key-123';

const request = require('supertest');
const app = require('../app');

describe('GET /events', () => {
  test('returns a list of events with the expected structure', async () => {
    const response = await request(app)
      .get('/events')
      .set('X-API-Key', 'test-key-123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('events');
    expect(Array.isArray(response.body.events)).toBe(true);

    response.body.events.forEach((event) => {
      expect(event).toHaveProperty('event_id');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('location');
      expect(event).toHaveProperty('start_time');

      expect(typeof event.event_id).toBe('string');
      expect(typeof event.title).toBe('string');
      expect(typeof event.location).toBe('string');

      expect(event.event_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );

      console.log('Event start_time:', event.start_time);
      expect(Number.isNaN(Date.parse(event.start_time))).toBe(false);
    });
  });
});
