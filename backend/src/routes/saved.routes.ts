import { Router } from "express";
import {
  saveCollege,
  getSavedColleges,
  removeSavedCollege
} from "../controllers/saved.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:collegeId", protect, saveCollege);
router.get("/", protect, getSavedColleges);

router.delete("/:collegeId", protect, removeSavedCollege);

export default router;