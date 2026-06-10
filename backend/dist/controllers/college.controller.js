"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeById = exports.getColleges = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getColleges = async (req, res) => {
    try {
        const { search, location, rating, minFees, maxFees, page = "1", limit = "10" } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const whereClause = {
            OR: search
                ? [
                    {
                        name: {
                            contains: String(search),
                            mode: "insensitive"
                        }
                    },
                    {
                        location: {
                            contains: String(search),
                            mode: "insensitive"
                        }
                    }
                ]
                : undefined,
            location: location
                ? {
                    contains: String(location),
                    mode: "insensitive"
                }
                : undefined,
            rating: rating
                ? {
                    gte: Number(rating)
                }
                : undefined,
            fees: {
                gte: minFees
                    ? Number(minFees)
                    : undefined,
                lte: maxFees
                    ? Number(maxFees)
                    : undefined
            }
        };
        const colleges = await prisma_1.default.college.findMany({
            where: whereClause,
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber
        });
        const total = await prisma_1.default.college.count({
            where: whereClause
        });
        res.json({
            success: true,
            total,
            page: pageNumber,
            data: colleges
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
exports.getColleges = getColleges;
const getCollegeById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const college = await prisma_1.default.college.findUnique({
            where: { id },
            include: {
                courses: true,
                reviews: true
            }
        });
        if (!college) {
            return res.status(404).json({
                success: false,
                message: "College not found"
            });
        }
        res.json({
            success: true,
            data: college
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
exports.getCollegeById = getCollegeById;
