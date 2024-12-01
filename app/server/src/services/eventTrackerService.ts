import { PoolClient } from 'pg';
import { StarkNetCursor } from '@apibara/protocol';

export async function handleLandRegistered(
  client: PoolClient, 
  data: any,
  cursor: StarkNetCursor
) {
  const { land_id, owner, location, area, land_use, fee } = data;
  
  await client.query(
    `INSERT INTO lands (
      land_id, owner_address, location_latitude, 
      location_longitude, area, land_use, status, fee
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      land_id.toString(),
      owner.toString(),
      location.latitude,
      location.longitude,
      area.toString(),
      land_use,
      'PENDING',
      fee.toString()
    ]
  );
}

export async function handleLandTransferred(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { land_id, from_owner, to_owner } = data;

  await client.query(
    `INSERT INTO land_transfers (
      land_id, from_address, to_address, 
      transaction_hash, block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      land_id.toString(),
      from_owner.toString(),
      to_owner.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE lands SET owner_address = $1, updated_at = NOW() 
     WHERE land_id = $2`,
    [to_owner.toString(), land_id.toString()]
  );
}

export async function handleLandVerified(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { land_id, inspector } = data;

  await client.query(
    `INSERT INTO land_verifications (
      land_id, inspector_address, transaction_hash, 
      block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5)`,
    [
      land_id.toString(),
      inspector.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE lands SET 
      status = 'VERIFIED', 
      inspector_address = $1,
      updated_at = NOW()
     WHERE land_id = $2`,
    [inspector.toString(), land_id.toString()]
  );
}

export async function handleLandUpdated(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { land_id, area, land_use } = data;

  await client.query(
    `INSERT INTO land_updates (
      land_id, area, land_use, transaction_hash,
      block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      land_id.toString(),
      area.toString(),
      land_use,
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE lands SET 
      area = $1, 
      land_use = $2,
      updated_at = NOW()
     WHERE land_id = $3`,
    [area.toString(), land_use, land_id.toString()]
  );
}

export async function handleInspectorAdded(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { inspector } = data;

  await client.query(
    `INSERT INTO inspectors (
      address, is_active, added_at
    ) VALUES ($1, $2, $3)`,
    [
      inspector.toString(),
      true,
      new Date(cursor.timestamp * 1000)
    ]
  );
}

export async function handleInspectorRemoved(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { inspector } = data;

  await client.query(
    `UPDATE inspectors SET 
      is_active = false,
      removed_at = $1
     WHERE address = $2`,
    [new Date(cursor.timestamp * 1000), inspector.toString()]
  );
}

export async function handleLandInspectorSet(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { land_id, inspector } = data;

  await client.query(
    `INSERT INTO inspector_assignments (
      land_id, inspector_address, transaction_hash,
      block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5)`,
    [
      land_id.toString(),
      inspector.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE lands SET 
      inspector_address = $1,
      updated_at = NOW()
     WHERE land_id = $2`,
    [inspector.toString(), land_id.toString()]
  );
}

export async function handleFeeUpdated(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { old_fee, new_fee } = data;

  await client.query(
    `INSERT INTO fee_updates (
      old_fee, new_fee, transaction_hash,
      block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5)`,
    [
      old_fee.toString(),
      new_fee.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );
}

export async function handleListingCreated(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { listing_id, land_id, seller, price } = data;

  await client.query(
    `INSERT INTO listings (
      id, land_id, seller_address, price, status,
      created_at, updated_at, transaction_hash, block_number
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      listing_id.toString(),
      land_id.toString(),
      seller.toString(),
      price.toString(),
      'ACTIVE',
      new Date(cursor.timestamp * 1000),
      new Date(cursor.timestamp * 1000),
      cursor.transactionHash,
      cursor.blockNumber
    ]
  );
}

export async function handleListingPriceUpdated(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { listing_id, old_price, new_price } = data;

  await client.query(
    `INSERT INTO listing_price_updates (
      listing_id, old_price, new_price, transaction_hash,
      block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      listing_id.toString(),
      old_price.toString(),
      new_price.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE listings SET 
      price = $1,
      updated_at = NOW()
     WHERE id = $2`,
    [new_price.toString(), listing_id.toString()]
  );
}

export async function handleListingCancelled(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { listing_id } = data;

  await client.query(
    `UPDATE listings SET 
      status = 'CANCELLED',
      updated_at = NOW()
     WHERE id = $1`,
    [listing_id.toString()]
  );
}

export async function handleLandSold(
  client: PoolClient,
  data: any,
  cursor: StarkNetCursor
) {
  const { listing_id, land_id, seller, buyer, price } = data;

  await client.query(
    `INSERT INTO land_sales (
      listing_id, land_id, seller_address, buyer_address,
      price, transaction_hash, block_number, timestamp
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      listing_id.toString(),
      land_id.toString(),
      seller.toString(),
      buyer.toString(),
      price.toString(),
      cursor.transactionHash,
      cursor.blockNumber,
      new Date(cursor.timestamp * 1000)
    ]
  );

  await client.query(
    `UPDATE listings SET 
      status = 'SOLD',
      updated_at = NOW()
     WHERE id = $1`,
    [listing_id.toString()]
  );

  await client.query(
    `UPDATE lands SET 
      owner_address = $1,
      updated_at = NOW()
     WHERE land_id = $2`,
    [buyer.toString(), land_id.toString()]
  );
} 