import { ClientError, Status } from "@apibara/protocol";
import { Client } from "pg";
import { createIndexerConfig, IndexerMessage, EVENT_KEYS } from "./config";

export class LandRegistryIndexer {
  private pgClient: Client;
  private running: boolean = false;

  constructor() {
    this.pgClient = new Client({
      connectionString: createIndexerConfig().dbUrl,
    });
  }

  async start() {
    this.running = true;
    await this.pgClient.connect();

    while (this.running) {
      try {
        const { client, request } = createIndexerConfig();

        for await (const message of client.streamData(request)) {
          await this.handleMessage(message as IndexerMessage);
        }
      } catch (err) {
        if (err instanceof ClientError) {
          if (err.code !== Status.INTERNAL) {
            console.error("Non-recoverable error:", err);
            throw err;
          }

          // Internal errors are caused by disconnection
          console.log("Connection lost, reconnecting in 2 seconds...");
          await new Promise(r => setTimeout(r, 2000));
          continue;
        }
        throw err;
      }
      
    }
  }

  private async handleMessage(message: IndexerMessage) {
    switch (message._tag) {
      case "data": {
        if (!message.data) return;
        
        const block = message.data;
        // Process events
        for (const event of block.events) {
          const transaction = block.transactions.find(
            (tx: { transactionIndex: number }) => tx.transactionIndex === event.transactionIndex
          );
          
          // Get event key to determine event type
          const eventKey = event.keys[0];
          
          try {
            switch (eventKey) {
              case EVENT_KEYS.LAND_REGISTERED:
                await this.handleLandRegistered(event, transaction);
                break;
              case EVENT_KEYS.LAND_TRANSFERRED:
                await this.handleLandTransferred(event, transaction);
                break;
              case EVENT_KEYS.LAND_VERIFIED:
                await this.handleLandVerified(event, transaction);
                break;
              default:
                console.log("Unknown event:", eventKey);
            }
          } catch (error) {
            console.error(`Error processing event ${eventKey}:`, error);
          }
        }
        break;
      }
      case "invalidate": {
        // Handle chain reorg
        console.log("Chain reorganization detected");
        break;
      }
    }
  }

  // Event handler methods
  private async handleLandRegistered(event: any, transaction: any) {
    const [landId, ownerAddress, latitude, longitude, area, landUse] = event.data;
    await this.pgClient.query(
      `INSERT INTO lands (
        land_id, owner_address, location_latitude, location_longitude, 
        area, land_use, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 'registered', NOW(), NOW())`,
      [landId, ownerAddress, latitude, longitude, area, landUse]
    );
  }

  private async handleLandTransferred(event: any, transaction: any) {
    const [landId, fromAddress, toAddress] = event.data;
    await this.pgClient.query(
      `INSERT INTO land_transfers (
        land_id, from_address, to_address, transaction_hash, 
        block_number, timestamp
      ) VALUES ($1, $2, $3, $4, $5, NOW())`,
      [landId, fromAddress, toAddress, transaction.hash, transaction.blockNumber]
    );
    
    // Update land ownership
    await this.pgClient.query(
      `UPDATE lands SET owner_address = $1, updated_at = NOW() WHERE land_id = $2`,
      [toAddress, landId]
    );
  }

  private async handleLandVerified(event: any, transaction: any) {
    const [landId, inspectorAddress] = event.data;
    await this.pgClient.query(
      `INSERT INTO land_verifications (
        land_id, inspector_address, transaction_hash, 
        block_number, timestamp
      ) VALUES ($1, $2, $3, $4, NOW())`,
      [landId, inspectorAddress, transaction.hash, transaction.blockNumber]
    );
    
    // Update land status
    await this.pgClient.query(
      `UPDATE lands SET status = 'verified', updated_at = NOW() WHERE land_id = $1`,
      [landId]
    );
  }

  async stop() {
    this.running = false;
    await this.pgClient.end();
  }
}

// Start the indexer
if (require.main === module) {
  const indexer = new LandRegistryIndexer();
  indexer.start().catch((error) => {
    console.error("Failed to start indexer:", error);
    process.exit(1);
  });

  // Handle shutdown gracefully
  process.on("SIGINT", async () => {
    await indexer.stop();
    process.exit(0);
  });
} 