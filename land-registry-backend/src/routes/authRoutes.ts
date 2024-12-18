import { Router } from "express";
import { register, login } from "../controllers/authController";
import { routeHandler } from "../middleware/errorHandler";
const router = Router();

router.post("/register", routeHandler(register));
router.post("/login", routeHandler(login));

export default router;
