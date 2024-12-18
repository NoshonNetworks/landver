CREATE TABLE IF NOT EXISTS lands (
    land_id VARCHAR PRIMARY KEY,
    owner_address VARCHAR NOT NULL,
    location_latitude NUMERIC,
    location_longitude NUMERIC,
    area NUMERIC,
    land_use VARCHAR,
    status VARCHAR,
    inspector_address VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS land_transfers (
    id SERIAL PRIMARY KEY,
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    from_address VARCHAR NOT NULL,
    to_address VARCHAR NOT NULL,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS land_verifications (
    id SERIAL PRIMARY KEY,
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    inspector_address VARCHAR NOT NULL,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS land_updates (
    id SERIAL PRIMARY KEY,
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    area NUMERIC,
    land_use VARCHAR,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS inspectors (
    address VARCHAR PRIMARY KEY,
    is_active BOOLEAN DEFAULT true,
    added_at TIMESTAMP NOT NULL,
    removed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inspector_assignments (
    id SERIAL PRIMARY KEY,
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    inspector_address VARCHAR NOT NULL REFERENCES inspectors(address),
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- CREATE TABLE IF NOT EXISTS fee_updates (
--     id SERIAL PRIMARY KEY,
--     old_fee NUMERIC NOT NULL,
--     new_fee NUMERIC NOT NULL,
--     transaction_hash VARCHAR NOT NULL,
--     block_number BIGINT NOT NULL,
--     timestamp TIMESTAMP NOT NULL
-- );

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    seller_address VARCHAR NOT NULL,
    price NUMERIC NOT NULL,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS listing_price_updates (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER NOT NULL REFERENCES listings(id),
    old_price NUMERIC NOT NULL,
    new_price NUMERIC NOT NULL,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS land_sales (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER NOT NULL REFERENCES listings(id),
    land_id VARCHAR NOT NULL REFERENCES lands(land_id),
    seller_address VARCHAR NOT NULL,
    buyer_address VARCHAR NOT NULL,
    price NUMERIC NOT NULL,
    transaction_hash VARCHAR NOT NULL,
    block_number BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL
); 