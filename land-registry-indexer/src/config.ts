import { createClient } from "@apibara/protocol";
import { Filter, StarknetStream } from "@apibara/starknet";
import * as dotenv from "dotenv";

dotenv.config();

// Helper function to convert hex string to decimal string
const hexToDec = (hex: string): string => {
  return BigInt(hex).toString(10);
};

// Event keys for the Land Registry contract
export const EVENT_KEYS = {
  LAND_REGISTERED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000001"),
  LAND_TRANSFERRED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000002"),
  LAND_VERIFIED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000003"),
  LAND_UPDATED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000004"),
  INSPECTOR_ADDED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000005"),
  INSPECTOR_REMOVED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000006"),
  LAND_LISTED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000007"),
  LISTING_UPDATED: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000008"),
  LAND_SOLD: hexToDec("0x0000000000000000000000000000000000000000000000000000000000000009"),
};

export const createIndexerConfig = () => {
  const filter = Filter.make({
    header: "unknown",
    events: [{
      address: process.env.LAND_REGISTRY_ADDRESS as `0x${string}`,
      keys: Object.values(EVENT_KEYS).map((key) => `0x${key.toString()}` as `0x${string}`),
      transactionStatus: "succeeded",
    }],
  });

  const request = StarknetStream.Request.make({
    filter: [filter],
    finality: "accepted",
    startingCursor: {
      orderKey: BigInt(process.env.STARTING_BLOCK || "0"),
    },
  });

  return {
    client: createClient(StarknetStream, process.env.APIBARA_URL || ""),
    request,
    dbUrl: process.env.DATABASE_URL || "",
  };
};

export type IndexerMessage = {
  _tag: "data" | "invalidate";
  data?: any;
}; 