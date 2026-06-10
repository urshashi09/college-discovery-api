"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareColleges = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const compareColleges = async (req, res) => {
    try {
        const { collegeIds } = req.body;
        const colleges = await prisma_1.default.college.findMany({
            where: {
                id: {
                    in: collegeIds
                }
            }
        });
        res.json({
            success: true,
            data: colleges
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
exports.compareColleges = compareColleges;
