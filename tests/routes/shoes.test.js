const request = require('supertest');

const app = require('../../index');

test('GET /shoes starts empty', async () => {
  const res = await request(app).get('/shoes');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /shoes creates a shoe entry with an id', async () => {
  const shoe = {name: 'Jordan 1 Retro'};
  const res = await request(app).post('/shoes').send(shoe);

  expect(res.statusCode).toBe(201);

  const id = res.body.id;
  expect(Number.isInteger(id)).toBe(true);
  expect(id).toBeGreaterThan(0);

  expect(res.body.name).toBe('Jordan 1 Retro');
});
