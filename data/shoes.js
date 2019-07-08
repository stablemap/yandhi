const { Pool, types } = require('pg');

types.setTypeParser(1700, val => parseFloat(val));

const connectionString = process.env.PG_STRING;

const pool = new Pool({
  connectionString: connectionString
});

async function findAll() {
  const res = await pool.query('SELECT id, name, avg(true_to_size) AS true_to_size_avg FROM shoes LEFT JOIN true_to_size_readings ON id = shoe_id GROUP BY id');

  return res.rows;
}

async function findById(id) {
  const res = await pool.query('SELECT id, name, avg(true_to_size) AS true_to_size_avg FROM shoes LEFT JOIN true_to_size_readings ON id = shoe_id WHERE id = $1 GROUP BY id', [id]);
  return res.rows[0];
}

async function create(name) {
  const res = await pool.query('INSERT INTO shoes (name) VALUES ($1) RETURNING id', [name]);

  return {
    id: res.rows[0].id,
    name: name
  };
}

async function addTrueToSizeReading(shoeId, reading) {
  await pool.query('INSERT INTO true_to_size_readings (shoe_id, true_to_size) VALUES ($1, $2)', [shoeId, reading]);
}

module.exports = {findAll: findAll, findById: findById, create: create, addTrueToSizeReading: addTrueToSizeReading};
