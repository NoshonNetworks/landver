/**
 * Controller functions for handling land registry data
 * 
 * These functions manage the retrieval and processing of land registry data,
 * including all lands, individual land details, and related transfers and verifications.
 */

import { Request, Response, NextFunction } from 'express';
import * as landService from '../services/landService';
import { AppError } from '../middleware/errorHandler';

export async function getAllLands(req: Request, res: Response, next: NextFunction) {
  try {
    const lands = await landService.getAllLands();
    res.json(lands);
  } catch (error) {
    next(error);
  }
}

export async function getLandById(req: Request, res: Response, next: NextFunction) {
  try {
    const land = await landService.getLandById(req.params.landId);
    if (!land) {
      throw new AppError(404, 'Land not found', 'LAND_NOT_FOUND');
    }
    res.json(land);
  } catch (error) {
    next(error);
  }
}

export async function getLandTransfers(req: Request, res: Response, next: NextFunction) {
  try {
    const transfers = await landService.getLandTransfers(req.params.landId);
    res.json(transfers);
  } catch (error) {
    next(error);
  }
}

export async function getLandVerifications(req: Request, res: Response, next: NextFunction) {
  try {
    const verifications = await landService.getLandVerifications(req.params.landId);
    res.json(verifications);
  } catch (error) {
    next(error);
  }
}

export async function getLandsByOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const lands = await landService.getLandsByOwner(req.params.address);
    res.json(lands);
  } catch (error) {
    next(error);
  }
} 