process.env.API_KEYS = 'test-key-123';
const request = require('supertest');
const app = require('../app');

describe('GET /marketplace/listings', () => {
  test('returns active listings with the expected fields', async () => {
    const response = await request(app)
  .get('/marketplace/listings?status=active')
  .set('X-API-Key', 'test-key-123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('listings');
    expect(Array.isArray(response.body.listings)).toBe(true);

    response.body.listings.forEach((listing) => {
      expect(listing).toHaveProperty('listing_id');
      expect(listing).toHaveProperty('item_name');
      expect(listing).toHaveProperty('price');
      expect(listing).toHaveProperty('currency');

      expect(typeof listing.listing_id).toBe('string');
      expect(typeof listing.item_name).toBe('string');
      expect(typeof listing.price).toBe('number');
      expect(Number.isFinite(listing.price)).toBe(true);
      expect(typeof listing.currency).toBe('string');

      expect(listing.listing_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });
  });

  test('rejects a missing status parameter', async () => {
    const response = await request(app)
  .get('/marketplace/listings')
  .set('X-API-Key', 'test-key-123');
    expect(response.status).toBe(400);
  });

  test('rejects an invalid status parameter', async () => {
    const response = await request(app)
  .get('/marketplace/listings?status=inactive')
  .set('X-API-Key', 'test-key-123');
    expect(response.status).toBe(400);
  });
});
