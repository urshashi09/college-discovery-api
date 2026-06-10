import { Router } from "express";
import { predictCollege } from "../controllers/predictor.controller";
import { validate } from "../middleware/validate.middleware";
import { predictorSchema } from "../validators/predictor.validator";


const router = Router();

router.post("/", validate(predictorSchema), predictCollege);

export default router;