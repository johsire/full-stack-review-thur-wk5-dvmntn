CREATE TABLE users (
  id serial PRIMARY KEY,
  user_name VARCHAR(180),
  email VARCHAR(180),
  auth_id TEXT,
  picture TEXT
);
