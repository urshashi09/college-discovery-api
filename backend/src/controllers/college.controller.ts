import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getColleges = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      location,
      rating,
      minFees,
      maxFees,
      page = "1",
      limit = "10"
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const colleges = await prisma.college.findMany({
      where: {
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
      },

      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber
    });

    const total = await prisma.college.count();

    res.json({
      success: true,
      total,
      page: pageNumber,
      data: colleges
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const college = await prisma.college.findUnique({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};