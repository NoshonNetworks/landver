-- Create a dedicated schema for the land registry
CREATE SCHEMA IF NOT EXISTS land_registry;

-- Set the search path
SET search_path TO land_registry, public;

-- Land Events table
CREATE TABLE IF NOT EXISTS land_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    land_id VARCHAR(255) NOT NULL,
    block_number BIGINT NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for better query performance
    CONSTRAINT unique_tx_event UNIQUE(transaction_hash, event_type, land_id)
);
CREATE INDEX IF NOT EXISTS idx_land_events_land_id ON land_events(land_id);
CREATE INDEX IF NOT EXISTS idx_land_events_timestamp ON land_events(timestamp);

-- Lands table for current state
CREATE TABLE IF NOT EXISTS lands (
    land_id VARCHAR(255) PRIMARY KEY,
    owner_address VARCHAR(42) NOT NULL,
    location TEXT NOT NULL,
    area NUMERIC NOT NULL,
    land_use VARCHAR(100) NOT NULL,
    document_hash VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    last_transaction_timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_lands_owner ON lands(owner_address);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update timestamp
CREATE TRIGGER update_lands_updated_at
    BEFORE UPDATE ON lands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
