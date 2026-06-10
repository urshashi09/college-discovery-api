"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const predictor_controller_1 = require("../controllers/predictor.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const predictor_validator_1 = require("../validators/predictor.validator");
const router = (0, express_1.Router)();
router.post("/", (0, validate_middleware_1.validate)(predictor_validator_1.predictorSchema), predictor_controller_1.predictCollege);
exports.default = router;
