CREATE TYPE user_type AS ENUM ('landowner', 'inspector');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  wallet_address VARCHAR(255) UNIQUE NOT NULL,
  user_type user_type NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 