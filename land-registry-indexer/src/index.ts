/**
 * Main entry point for the Land Registry Indexer
 * 
 * This script initializes the indexer, connects to the PostgreSQL database,
 * and starts processing events from the StarkNet node using Apibara.

 */

import { Indexer, IndexerRunner } from '@apibara/indexer';
import { StarkNetCursor, Filter } from '@apibara/protocol';
import { Pool } from 'pg';
import { config } from './config';
import {
  handleLandRegistered,
  handleLandTransferred,
  handleLandVerified,
  handleLandUpdated,
  handleInspectorAdded,
  handleInspectorRemoved,
  handleLandInspectorSet,
  handleListingCreated,
  handleListingPriceUpdated,
  handleListingCancelled,
  handleLandSold
} from './eventHandlers';

const pool = new Pool({
  connectionString: config.pgConnection,
});

class LandRegistryIndexer implements Indexer<StarkNetCursor> {
  async handleData(cursor: StarkNetCursor, data: any[]): Promise<void> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      for (const event of data) {
        const { name, data: eventData } = event;
        
        switch (name) {
          case 'LandRegistered':
            await handleLandRegistered(client, eventData, cursor);
            break;
          case 'LandTransferred':
            await handleLandTransferred(client, eventData, cursor);
            break;
          case 'LandVerified':
            await handleLandVerified(client, eventData, cursor);
            break;
          case 'LandUpdated':
            await handleLandUpdated(client, eventData, cursor);
            break;
          case 'InspectorAdded':
            await handleInspectorAdded(client, eventData, cursor);
            break;
          case 'InspectorRemoved':
            await handleInspectorRemoved(client, eventData, cursor);
            break;
          case 'LandInspectorSet':
            await handleLandInspectorSet(client, eventData, cursor);
            break;

          case 'ListingCreated':
            await handleListingCreated(client, eventData, cursor);
            break;
          case 'ListingPriceUpdated':
            await handleListingPriceUpdated(client, eventData, cursor);
            break;
          case 'ListingCancelled':
            await handleListingCancelled(client, eventData, cursor);
            break;
          case 'LandSold':
            await handleLandSold(client, eventData, cursor);
            break;
        }
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  getFilter(): Filter {
    return {
      header: { weak: true },
      events: [{
        fromAddress: config.landRegistryAddress,
        keys: [
          ['LandRegistered'],
          ['LandTransferred'],
          ['LandVerified'],
          ['LandUpdated'],
          ['InspectorAdded'],
          ['InspectorRemoved'],
          ['LandInspectorSet'],
          ['FeeUpdated'],
          ['ListingCreated'],
          ['ListingPriceUpdated'],
          ['ListingCancelled'],
          ['LandSold']
        ],
      }],
    };
  }
}

const runner = new IndexerRunner({
  indexer: new LandRegistryIndexer(),
  startingBlock: config.startingBlock,
  network: {
    url: config.apibaraUrl,
  },
});

runner.start().catch((error) => {
  console.error('Indexer failed:', error);
  process.exit(1);
}); 