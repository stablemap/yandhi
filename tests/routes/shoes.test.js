const request = require('supertest');
const { Pool } = require('pg');

const connectionString = 'postgresql://Kemper:@localhost/stockx';

const pool = new Pool({
  connectionString: connectionString
});

beforeEach(() => pool.query('DELETE FROM shoes'));

const app = require('../../index');

afterAll(() => {
  pool.end();
});

test('GET /shoes starts empty', async () => {
  const res = await request(app).get('/shoes');

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /shoes returns a new shoe object with the given name and a new id', async () => {
  const res = await request(app).post('/shoes').send({name: 'Jordan 1 Retro'});

  expect(res.statusCode).toBe(201);

  const id = res.body.id;
  expect(Number.isInteger(id)).toBe(true);
  expect(id).toBeGreaterThan(0);

  expect(res.body.name).toBe('Jordan 1 Retro');
});
