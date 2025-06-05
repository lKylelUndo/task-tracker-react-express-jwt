import { Router } from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use(authRoutes);
router.use(taskRoutes);

export default router;
