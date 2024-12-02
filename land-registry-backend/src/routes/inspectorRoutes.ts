import { Router } from 'express';
import { param } from 'express-validator';
import { validate } from '../middleware/validate';
import * as inspectorController from '../controllers/inspectorController';

export const inspectorRoutes = Router();

inspectorRoutes.get('/', inspectorController.getAllInspectors);

inspectorRoutes.get(
  '/:address/assignments',
  [param('address').isString()],
  validate,
  inspectorController.getInspectorAssignments
); 