import { Router } from 'express';
import { param, query } from 'express-validator';
import { validate } from '../middleware/validate';
import * as landController from '../controllers/landController';

export const landRoutes = Router();

landRoutes.get('/', landController.getAllLands);

landRoutes.get(
  '/:landId',
  [param('landId').isString()],
  validate,
  landController.getLandById
);

landRoutes.get(
  '/:landId/transfers',
  [param('landId').isString()],
  validate,
  landController.getLandTransfers
);

landRoutes.get(
  '/:landId/verifications',
  [param('landId').isString()],
  validate,
  landController.getLandVerifications
);

landRoutes.get(
  '/owner/:address',
  [param('address').isString()],
  validate,
  landController.getLandsByOwner
); 