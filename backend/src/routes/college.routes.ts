import { Router } from "express";
import { getCollegeById, getColleges } from "../controllers/college.controller";

const router = Router();

router.get("/", getColleges);
router.get("/:id", getCollegeById);

export default router;