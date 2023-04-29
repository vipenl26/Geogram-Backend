CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    gender VARCHAR(10)
);