"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictorSchema = void 0;
const zod_1 = require("zod");
exports.predictorSchema = zod_1.z.object({
    examName: zod_1.z.string().min(1),
    category: zod_1.z.string().min(1),
    rank: zod_1.z.number().positive()
});
