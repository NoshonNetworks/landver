import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: "success",
      message: "User signed in successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.status(201).json({
      status: "success",
      message: "User logged successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
} 


//Logout user
export const logoutUser = 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("landver_token", "", { maxAge: 1 });
      // res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = req.user?._id || "";

      res.status(200).json({
        success: true,
        message: "Logged Out successfully",
      });
    } catch (error: any) {
      return next(error);
    }
  }
