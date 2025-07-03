import { Request, Response, NextFunction } from "express";

/**
 * Middleware to restrict access to routes based on user role.
 * Usage: app.use('/dashboard/owner', roleGuard(['owner']), ...)
 */
export function roleGuard(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Assumes req.user is set by authentication middleware (e.g., JWT)
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
}
