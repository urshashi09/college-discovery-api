"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comparison_controller_1 = require("../controllers/comparison.controller");
const router = (0, express_1.Router)();
router.post("/", comparison_controller_1.compareColleges);
exports.default = router;
