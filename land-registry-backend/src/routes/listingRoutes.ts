import { Router } from 'express';
import { param } from 'express-validator';
import { validate } from '../middleware/validate';
import * as listingController from '../controllers/listingController';

export const listingRoutes = Router();

listingRoutes.get('/active', listingController.getActiveListings);

listingRoutes.get(
  '/:listingId',
  [param('listingId').isString()],
  validate,
  listingController.getListingById
);

listingRoutes.get(
  '/:listingId/price-history',
  [param('listingId').isString()],
  validate,
  listingController.getListingPriceHistory
);

listingRoutes.get('/sales', listingController.getLandSales); 