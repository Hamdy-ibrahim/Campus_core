process.env.API_KEYS = 'test-key-123';
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const { randomUUID } = require('crypto');

describe('POST /fitcoach-users/:fitcoach_userId/fitcoach-bindings', () => {
  test('rejects a request with missing required fields', async () => {
    const response = await request(app)
  .post(`/fitcoach-users/${randomUUID()}/fitcoach-bindings`)
  .set('X-API-Key', 'test-key-123')
  .send({});

    expect([400, 422]).toContain(response.status);
  });

  test('creates a binding and rejects a duplicate', async () => {
    const [students] = await db.query(`
      SELECT public_id
      FROM users
      WHERE public_id IS NOT NULL
      LIMIT 1
    `);

    if (students.length === 0) {
      throw new Error(
        'A test student with a public_id is required in the users table.'
      );
    }

    const fitcoachUserId = randomUUID();
    const studentId = students[0].public_id;

    try {
      const response = await request(app)
  .post(`/fitcoach-users/${fitcoachUserId}/fitcoach-bindings`)
  .set('X-API-Key', 'test-key-123')
  .send({
    campuscore_student_id: studentId,
    verification_token: 'week7-test-token'
  });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('binding_id');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('bound_at');

      expect(typeof response.body.binding_id).toBe('string');
      expect(response.body.status).toBe('active');
      expect(Number.isNaN(Date.parse(response.body.bound_at))).toBe(false);

      const duplicateResponse = await request(app)
  .post(`/fitcoach-users/${fitcoachUserId}/fitcoach-bindings`)
  .set('X-API-Key', 'test-key-123')
  .send({
    campuscore_student_id: studentId,
    verification_token: 'week7-test-token'
  });

      expect([400, 409]).toContain(duplicateResponse.status);
    } finally {
      await db.query(
        'DELETE FROM fitcoach_bindings WHERE fitcoach_user_id = ?',
        [fitcoachUserId]
      );
    }
  });
});
