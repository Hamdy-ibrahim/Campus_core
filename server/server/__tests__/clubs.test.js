process.env.API_KEYS = 'test-key-123';
const request = require('supertest');
const app = require('../app');

describe('GET /clubs', () => {
  test('returns a list of clubs with the expected structure', async () => {
    const response = await request(app)
  .get('/clubs')
  .set('X-API-Key', 'test-key-123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clubs');
    expect(Array.isArray(response.body.clubs)).toBe(true);

    response.body.clubs.forEach((club) => {
      expect(club).toHaveProperty('club_id');
      expect(club).toHaveProperty('name');
      expect(club).toHaveProperty('category');

      expect(typeof club.club_id).toBe('string');
      expect(typeof club.name).toBe('string');
      expect(typeof club.category).toBe('string');

      expect(club.club_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });
  });
});
