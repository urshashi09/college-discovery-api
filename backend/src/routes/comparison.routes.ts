import { Router } from "express";
import { compareColleges } from "../controllers/comparison.controller";

const router = Router();

router.post("/", compareColleges);

export default router;