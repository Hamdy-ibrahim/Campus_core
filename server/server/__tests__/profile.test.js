process.env.API_KEYS = 'test-key-123';
const request = require('supertest');
const app = require('../app');
const { randomUUID } = require('crypto');

describe('GET /fitcoach-users/:fitcoach_userId/profile', () => {
  test('returns a profile for an existing active binding', async () => {
    const db = require('../db');
    const [rows] = await db.query(`
      SELECT fitcoach_user_id
      FROM fitcoach_bindings
      WHERE status = 'active'
      LIMIT 1
    `);

    if (rows.length === 0) {
      console.warn(
        'Skipping profile success test: no active binding exists in the database.'
      );
      return;
    }

    const response = await request(app)
  .get(`/fitcoach-users/${rows[0].fitcoach_user_id}/profile`)
  .set('X-API-Key', 'test-key-123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('student_id');
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');

    expect(typeof response.body.student_id).toBe('string');
    expect(typeof response.body.first_name).toBe('string');
    expect(typeof response.body.last_name).toBe('string');
    expect(typeof response.body.email).toBe('string');
  });

  test('returns not found for an unknown FitCoach user', async () => {
    const unknownId = randomUUID();

    const response = await request(app)
  .get(`/fitcoach-users/${unknownId}/profile`)
  .set('X-API-Key', 'test-key-123');
    expect(response.status).toBe(404);
  });
});
