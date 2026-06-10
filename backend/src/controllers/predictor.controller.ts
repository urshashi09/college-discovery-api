import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const predictCollege = async (
  req: Request,
  res: Response
) => {
  try {
    const { examName, category, rank } = req.body;

    const predictions = await prisma.predictorCutoff.findMany({
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

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};