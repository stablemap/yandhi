const { Pool } = require('pg');

const connectionString = 'postgresql://Kemper:@localhost/stockx';

const pool = new Pool({
  connectionString: connectionString
});

async function create(name) {
  const res = await pool.query('INSERT INTO shoes (name) VALUES ($1) RETURNING id', [name]);

  return {
    id: res.rows[0].id,
    name: name
  }
}

module.exports = {create: create, shutdown: shutdown()};
