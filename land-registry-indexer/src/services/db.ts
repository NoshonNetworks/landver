import { Client } from "pg";

export class DatabaseService {
  private client: Client;

  constructor(connectionString: string) {
    this.client = new Client({ connectionString });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  // Land operations
  async registerLand(landId: string, ownerAddress: string, latitude: number, longitude: number, area: number, landUse: string) {
    return this.client.query(
      `INSERT INTO lands (
        land_id, owner_address, location_latitude, location_longitude, 
        area, land_use, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 'registered', NOW(), NOW())`,
      [landId, ownerAddress, latitude, longitude, area, landUse]
    );
  }

  async transferLand(landId: string, fromAddress: string, toAddress: string, txHash: string, blockNumber: number) {
    // Use transaction to ensure data consistency
    try {
      await this.client.query('BEGIN');
      
      await this.client.query(
        `INSERT INTO land_transfers (
          land_id, from_address, to_address, transaction_hash, 
          block_number, timestamp
        ) VALUES ($1, $2, $3, $4, $5, NOW())`,
        [landId, fromAddress, toAddress, txHash, blockNumber]
      );
      
      await this.client.query(
        `UPDATE lands SET owner_address = $1, updated_at = NOW() WHERE land_id = $2`,
        [toAddress, landId]
      );

      await this.client.query('COMMIT');
    } catch (e) {
      await this.client.query('ROLLBACK');
      throw e;
    }
  }

  async verifyLand(landId: string, inspectorAddress: string, txHash: string, blockNumber: number) {
    try {
      await this.client.query('BEGIN');
      
      await this.client.query(
        `INSERT INTO land_verifications (
          land_id, inspector_address, transaction_hash, 
          block_number, timestamp
        ) VALUES ($1, $2, $3, $4, NOW())`,
        [landId, inspectorAddress, txHash, blockNumber]
      );
      
      await this.client.query(
        `UPDATE lands SET status = 'verified', updated_at = NOW() WHERE land_id = $1`,
        [landId]
      );

      await this.client.query('COMMIT');
    } catch (e) {
      await this.client.query('ROLLBACK');
      throw e;
    }
  }
} 