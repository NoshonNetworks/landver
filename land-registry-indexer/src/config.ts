/**
 * Configuration settings for the Land Registry Indexer
 * 
 * This module loads environment variables from a .env file and provides
 * configuration constants used throughout the application.
 */

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  startingBlock: Number(process.env.STARTING_BLOCK || 0),
  landRegistryAddress: process.env.LAND_REGISTRY_ADDRESS || '',
  pgConnection: process.env.DATABASE_URL || '',
  apibaraUrl: process.env.APIBARA_URL || '',
}; 
