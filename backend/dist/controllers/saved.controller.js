"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSavedCollege = exports.getSavedColleges = exports.saveCollege = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const saveCollege = async (req, res) => {
    const collegeId = Number(req.params.collegeId);
    const saved = await prisma_1.default.savedCollege.create({
        data: {
            userId: req.userId,
            collegeId
        }
    });
    res.status(201).json({
        success: true,
        data: saved
    });
};
exports.saveCollege = saveCollege;
const getSavedColleges = async (req, res) => {
    const colleges = await prisma_1.default.savedCollege.findMany({
        where: {
            userId: req.userId
        },
        include: {
            college: true
        }
    });
    res.json({
        success: true,
        data: colleges
    });
};
exports.getSavedColleges = getSavedColleges;
const removeSavedCollege = async (req, res) => {
    const collegeId = Number(req.params.collegeId);
    await prisma_1.default.savedCollege.delete({
        where: {
            userId_collegeId: {
                userId: req.userId,
                collegeId
            }
        }
    });
    res.json({
        success: true,
        message: "College removed"
    });
};
exports.removeSavedCollege = removeSavedCollege;
