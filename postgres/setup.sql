CREATE TABLE shoes (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE
);

CREATE TABLE true_to_size_readings (
  shoe_id integer NOT NULL REFERENCES shoes ON DELETE CASCADE,
  true_to_size integer NOT NULL CHECK (true_to_size BETWEEN 1 AND 5)
);
