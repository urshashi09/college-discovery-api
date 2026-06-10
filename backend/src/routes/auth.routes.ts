import { Router } from "express";

import {
  register,
  login,
  profile
} from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

import {
  registerSchema,
  loginSchema
} from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/profile",
  protect,
  profile
);

export default router;