import dotenv from 'dotenv';
dotenv.config();

export const config = {
  startingBlock: Number(process.env.STARTING_BLOCK || 0),
  landRegistryAddress: process.env.LAND_REGISTRY_ADDRESS || '',
  pgConnection: process.env.DATABASE_URL || '',
  apibaraUrl: process.env.APIBARA_URL || 'https://goerli.starknet.a5a.ch',
}; 