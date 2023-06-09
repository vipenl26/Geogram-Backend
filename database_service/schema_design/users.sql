CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL
);


CREATE INDEX IF NOT EXISTS users_username_index
ON users(username);
