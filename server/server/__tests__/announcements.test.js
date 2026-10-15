
const request = require('supertest');
const app = require('../app');

describe('GET /announcements', () => {
  test('returns announcements with the expected structure', async () => {
    const response = await request(app).get('/announcements');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('announcements');
    expect(Array.isArray(response.body.announcements)).toBe(true);

    response.body.announcements.forEach((announcement) => {
      expect(announcement).toHaveProperty('announcement_id');
      expect(announcement).toHaveProperty('headline');
      expect(announcement).toHaveProperty('published_at');

      expect(typeof announcement.announcement_id).toBe('string');
      expect(typeof announcement.headline).toBe('string');

      expect(announcement.announcement_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );

      expect(typeof announcement.published_at).toBe('string');
      expect(Number.isNaN(Date.parse(announcement.published_at))).toBe(false);
    });
  });
});
