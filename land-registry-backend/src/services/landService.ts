import { query } from './db';
import { Land, LandTransfer, LandVerification } from '../types';

export async function getAllLands(): Promise<Land[]> {
  const result = await query(`
    SELECT * FROM lands 
    ORDER BY created_at DESC
  `);
  return result.rows;
}

export async function getLandById(landId: string): Promise<Land | null> {
  const result = await query(`
    SELECT * FROM lands 
    WHERE land_id = $1
  `, [landId]);
  return result.rows[0] || null;
}

export async function getLandTransfers(landId: string): Promise<LandTransfer[]> {
  const result = await query(`
    SELECT * FROM land_transfers 
    WHERE land_id = $1 
    ORDER BY timestamp DESC
  `, [landId]);
  return result.rows;
}

export async function getLandVerifications(landId: string): Promise<LandVerification[]> {
  const result = await query(`
    SELECT * FROM land_verifications 
    WHERE land_id = $1 
    ORDER BY timestamp DESC
  `, [landId]);
  return result.rows;
}

export async function getLandsByOwner(ownerAddress: string): Promise<Land[]> {
  const result = await query(`
    SELECT * FROM lands 
    WHERE owner_address = $1 
    ORDER BY created_at DESC
  `, [ownerAddress]);
  return result.rows;
} 