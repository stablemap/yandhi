const request = require('supertest');
const { Pool } = require('pg');

console.log(process.env.PG_STRING);
const connectionString = process.env.PG_STRING;

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

test('Created shoes show up in the overall list', async () => {
  await request(app).post('/shoes').send({name: 'Jordan 1 Retro'});
  await request(app).post('/shoes').send({name: 'Nike React Presto'});

  const res = await request(app).get('/shoes');

  expect(res.body).toHaveLength(2);
  expect(res.body.map(shoe => shoe.name)).
      toEqual(expect.arrayContaining(['Jordan 1 Retro', 'Nike React Presto']));
  expect(res.body[0].id).not.toBe(res.body[1].id);
});

test('Existing shoes are retrievable', async () => {
  const creationRes = await request(app).post('/shoes').send({name: 'Jordan 1 Retro'});
  const newId = creationRes.body.id;

  const res = await request(app).get('/shoes/' + newId);

  expect(res.statusCode).toBe(200);
  console.log(res.body);
  expect(res.body.id).toBe(newId);
  expect(res.body.name).toBe('Jordan 1 Retro');
});

test('Can add true-to-size readings to existing shoes', async () => {
  const creationRes = await request(app).post('/shoes').send({name: 'Jordan 1 Retro'});
  const newId = creationRes.body.id;

  const sizeRes = await request(app).post('/shoes/' + newId + "/add_true_to_size").send({
    reading: 2
  });

  expect(sizeRes.statusCode).toBe(204);

  const shoeRes = await request(app).get('/shoes/' + newId);

  expect(shoeRes.body.true_to_size_avg).toBe(2);
});
