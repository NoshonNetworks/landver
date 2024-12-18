export interface Land {
  land_id: string;
  owner_address: string;
  location_latitude: number;
  location_longitude: number;
  area: string;
  land_use: string;
  status: string;
  inspector_address: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface LandTransfer {
  id: number;
  land_id: string;
  from_address: string;
  to_address: string;
  transaction_hash: string;
  block_number: string;
  timestamp: Date;
}

export interface LandVerification {
  id: number;
  land_id: string;
  inspector_address: string;
  transaction_hash: string;
  block_number: string;
  timestamp: Date;
}

export interface Inspector {
  address: string;
  is_active: boolean;
  added_at: Date;
  removed_at: Date | null;
}

export interface InspectorAssignment {
  id: number;
  land_id: string;
  inspector_address: string;
  transaction_hash: string;
  block_number: string;
  timestamp: Date;
}

export interface Listing {
  id: number;
  land_id: string;
  seller_address: string;
  price: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  transaction_hash: string;
  block_number: string;
}

export interface ListingPriceUpdate {
  id: number;
  listing_id: number;
  old_price: string;
  new_price: string;
  transaction_hash: string;
  block_number: string;
  timestamp: Date;
}

export interface LandSale {
  id: number;
  listing_id: number;
  land_id: string;
  seller_address: string;
  buyer_address: string;
  price: string;
  transaction_hash: string;
  block_number: string;
  timestamp: Date;
} 