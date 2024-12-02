/**
 * Controller functions for handling marketplace listings
 * 
 * These functions manage the retrieval and processing of marketplace listings,
 * including active listings and individual listing details.
 */

import { Request, Response, NextFunction } from 'express';
import * as listingService from '../services/listingService';
import { AppError } from '../middleware/errorHandler';

export async function getActiveListings(req: Request, res: Response, next: NextFunction) {
  try {
    const listings = await listingService.getActiveListings();
    res.json(listings);
  } catch (error) {
    next(error);
  }
}

export async function getListingById(req: Request, res: Response, next: NextFunction) {
  try {
    const listing = await listingService.getListingById(req.params.listingId);
    if (!listing) {
      throw new AppError(404, 'Listing not found', 'LISTING_NOT_FOUND');
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
}

export async function getListingPriceHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const priceHistory = await listingService.getListingPriceHistory(req.params.listingId);
    res.json(priceHistory);
  } catch (error) {
    next(error);
  }
}

export async function getLandSales(req: Request, res: Response, next: NextFunction) {
  try {
    const sales = await listingService.getLandSales();
    res.json(sales);
  } catch (error) {
    next(error);
  }
} 