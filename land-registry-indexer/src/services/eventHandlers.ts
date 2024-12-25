import { DatabaseService } from './db';
import { Event, Transaction } from '../types';

export class EventHandlerService {
  constructor(private db: DatabaseService) {}

  async handleLandRegistered(event: Event, transaction: Transaction) {
    const [landId, ownerAddress, latitude, longitude, area, landUse] = event.data;
    await this.db.registerLand(landId, ownerAddress, latitude, longitude, area, landUse);
  }

  async handleLandTransferred(event: Event, transaction: Transaction) {
    const [landId, fromAddress, toAddress] = event.data;
    await this.db.transferLand(
      landId, 
      fromAddress, 
      toAddress, 
      transaction.hash, 
      transaction.blockNumber
    );
  }

  async handleLandVerified(event: Event, transaction: Transaction) {
    const [landId, inspectorAddress] = event.data;
    await this.db.verifyLand(
      landId, 
      inspectorAddress, 
      transaction.hash, 
      transaction.blockNumber
    );
  }
} 