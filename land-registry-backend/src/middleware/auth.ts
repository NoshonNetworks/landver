import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    userType: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError(401, 'Authentication required', 'AUTH_REQUIRED');
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded as any;
    next();
  } catch (error) {
    next(new AppError(401, 'Invalid token', 'INVALID_TOKEN'));
  }
}; 