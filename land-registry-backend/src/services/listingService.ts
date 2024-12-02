import { query } from './db';
import { Listing, ListingPriceUpdate, LandSale } from '../types';

export async function getActiveListings(): Promise<Listing[]> {
  const result = await query(`
    SELECT l.*, lands.* 
    FROM listings l
    JOIN lands ON l.land_id = lands.land_id
    WHERE l.status = 'ACTIVE'
    ORDER BY l.created_at DESC
  `);
  return result.rows;
}

export async function getListingById(listingId: string): Promise<Listing | null> {
  const result = await query(`
    SELECT l.*, lands.* 
    FROM listings l
    JOIN lands ON l.land_id = lands.land_id
    WHERE l.id = $1
  `, [listingId]);
  return result.rows[0] || null;
}

export async function getListingPriceHistory(listingId: string): Promise<ListingPriceUpdate[]> {
  const result = await query(`
    SELECT * FROM listing_price_updates 
    WHERE listing_id = $1 
    ORDER BY timestamp DESC
  `, [listingId]);
  return result.rows;
}

export async function getLandSales(): Promise<LandSale[]> {
  const result = await query(`
    SELECT ls.*, l.*, lands.* 
    FROM land_sales ls
    JOIN listings l ON ls.listing_id = l.id
    JOIN lands ON ls.land_id = lands.land_id
    ORDER BY ls.timestamp DESC
  `);
  return result.rows;
} 