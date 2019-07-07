const { Pool } = require('pg');

const connectionString = 'postgresql://Kemper:@localhost/stockx';

const pool = new Pool({
  connectionString: connectionString
});

async function findAll() {
  const res = await pool.query('SELECT id, name FROM shoes');

  return res.rows;
}

async function findById(id) {
  const res = await pool.query('SELECT name FROM shoes WHERE id = $1', [id]);

  return {
    id: id,
    name: res.rows[0].name
  };
}

async function create(name) {
  const res = await pool.query('INSERT INTO shoes (name) VALUES ($1) RETURNING id', [name]);

  return {
    id: res.rows[0].id,
    name: name
  };
}

module.exports = {findAll: findAll, findById: findById, create: create};
