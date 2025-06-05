import { Router } from "express";
import {
  loginFunction,
  logoutFunction,
  registerFunction,
} from "../controllers/authController.js";
import {
  loginValidationRules,
  registerValidationRules,
} from "../utils/validations.js";

const router = Router();

router.post("/login", loginValidationRules, loginFunction);
router.post("/register", registerValidationRules, registerFunction);
router.post("/logout", logoutFunction);

export default router;
