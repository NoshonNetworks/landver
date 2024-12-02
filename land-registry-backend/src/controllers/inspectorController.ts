/**
 * Controller functions for handling inspector data
 * 
 * These functions manage the retrieval and processing of inspector data,
 * including all inspectors and their assignments.
 */

import { Request, Response, NextFunction } from 'express';
import * as inspectorService from '../services/inspectorService';

export async function getAllInspectors(req: Request, res: Response, next: NextFunction) {
  try {
    const inspectors = await inspectorService.getAllInspectors();
    res.json(inspectors);
  } catch (error) {
    next(error);
  }
}

export async function getInspectorAssignments(req: Request, res: Response, next: NextFunction) {
  try {
    const assignments = await inspectorService.getInspectorAssignments(req.params.address);
    res.json(assignments);
  } catch (error) {
    next(error);
  }
} 