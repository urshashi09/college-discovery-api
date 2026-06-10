"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictCollege = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const predictCollege = async (req, res) => {
    try {
        const { examName, category, rank } = req.body;
        const predictions = await prisma_1.default.predictorCutoff.findMany({
            where: {
                examName: {
                    equals: examName,
                    mode: "insensitive"
                },
                category: {
                    equals: category,
                    mode: "insensitive"
                },
                cutoffRank: {
                    gte: Number(rank)
                }
            },
            include: {
                college: true
            }
        });
        res.json({
            success: true,
            count: predictions.length,
            data: predictions
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
exports.predictCollege = predictCollege;
