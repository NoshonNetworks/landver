import { ClientError, Status } from "@apibara/protocol";
import { createIndexerConfig, EVENT_KEYS } from "./config";
import { DatabaseService } from "./services/db";
import { EventHandlerService } from "./services/eventHandlers";
import { IndexerMessage, Event, Transaction, Block } from "./types";

export class LandRegistryIndexer {
  private db: DatabaseService;
  private eventHandler: EventHandlerService;
  private running: boolean = false;

  constructor() {
    this.db = new DatabaseService(createIndexerConfig().dbUrl);
    this.eventHandler = new EventHandlerService(this.db);
  }

  async start() {
    this.running = true;
    await this.db.connect();

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
        await this.processBlock(message.data);
        break;
      }
      case "invalidate": {
        console.log("Chain reorganization detected");
        break;
      }
    }
  }

  private async processBlock(block: Block) {
    for (const event of block.events) {
      const transaction = block.transactions.find(
        tx => tx.transactionIndex === event.transactionIndex
      ) as Transaction;
      
      if (!transaction) {
        console.error(`No transaction found for event at index ${event.transactionIndex}`);
        continue;
      }

      try {
        await this.processEvent(event, transaction);
      } catch (error) {
        console.error(`Error processing event:`, error);
      }
    }
  }

  private async processEvent(event: Event, transaction: Transaction) {
    const eventKey = event.keys[0];
    
    switch (eventKey) {
      case EVENT_KEYS.LAND_REGISTERED:
        await this.eventHandler.handleLandRegistered(event, transaction);
        break;
      case EVENT_KEYS.LAND_TRANSFERRED:
        await this.eventHandler.handleLandTransferred(event, transaction);
        break;
      case EVENT_KEYS.LAND_VERIFIED:
        await this.eventHandler.handleLandVerified(event, transaction);
        break;
      default:
        console.log("Unknown event:", eventKey);
    }
  }

  async stop() {
    this.running = false;
    await this.db.disconnect();
  }
}

// Start the indexer
if (require.main === module) {
  const indexer = new LandRegistryIndexer();
  indexer.start().catch((error) => {
    console.error("Failed to start indexer:", error);
    process.exit(1);
  });

  process.on("SIGINT", async () => {
    await indexer.stop();
    process.exit(0);
  });
} 