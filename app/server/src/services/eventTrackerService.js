const { Indexer } = require('@apibara/protocol');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schema);
  } finally {
    client.release();
  }
}

async function processEvent(client, event, blockNumber, timestamp) {
  const { name: eventType, args, transactionHash } = event;
  
  // Insert into land_events
  await client.query(
    `INSERT INTO land_registry.land_events (
      event_type, land_id, block_number, transaction_hash, 
      timestamp, data
    ) VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ON CONSTRAINT unique_tx_event DO NOTHING`,
    [
      eventType,
      args[0], // landId
      blockNumber,
      transactionHash,
      new Date(timestamp * 1000),
      JSON.stringify(args)
    ]
  );

  // Update lands table based on event type
  switch (eventType) {
    case 'LandRegistered':
      const [landId, owner, location, area, landUse, documentHash] = args;
      await client.query(
        `INSERT INTO land_registry.lands (
          land_id, owner_address, location, area, 
          land_use, document_hash, last_transaction_timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [landId, owner, location, area.toString(), landUse, documentHash, new Date(timestamp * 1000)]
      );
      break;

    case 'LandVerified':
      const [verifiedLandId] = args;
      await client.query(
        `UPDATE land_registry.lands 
         SET is_verified = true, 
             last_transaction_timestamp = $2
         WHERE land_id = $1`,
        [verifiedLandId, new Date(timestamp * 1000)]
      );
      break;

    case 'LandTransferred':
      const [transferredLandId, , newOwner] = args;
      await client.query(
        `UPDATE land_registry.lands 
        SET owner_address = $2, 
        last_transaction_timestamp = $3
        WHERE land_id = $1`,
        [transferredLandId, newOwner, new Date(timestamp * 1000)]
      );
      break;
  }
}

async function startEventTracking(contractAddress, startBlock) {
  const indexer = new Indexer({
    stream_url: process.env.APIBARA_URL,
    network: process.env.ETHEREUM_NETWORK,
    starting_block: startBlock
  });

  indexer.addContract({
    address: contractAddress,
    events: [
      'LandRegistered(string,address,string,uint256,string,string)',
      'LandVerified(string)',
      'LandTransferred(string,address,address)'
    ]
  });

  indexer.on('data', async (block) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const event of block.events) {
        await processEvent(client, event, block.number, block.timestamp);
      }
      
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error processing events:', error);
    } finally {
      client.release();
    }
  });

  indexer.start();
  console.log('Event tracking started');
}

// Helper functions for querying the database
async function getLandCurrentState(landId) {
  const result = await pool.query(
    'SELECT * FROM land_registry.lands WHERE land_id = $1',
    [landId]
  );
  return result.rows[0];
}

async function getLandHistory(landId) {
  const result = await pool.query(
    'SELECT * FROM land_registry.land_events WHERE land_id = $1 ORDER BY block_number ASC',
    [landId]
  );
  return result.rows;
}

module.exports = {
  setupDatabase,
  startEventTracking,
  getLandCurrentState,
  getLandHistory
};