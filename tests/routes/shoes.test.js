const request = require('supertest');

const app = require('../../index');

test('GET /shoes starts empty', async () => {
  const res = await request(app).get('/shoes');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});
