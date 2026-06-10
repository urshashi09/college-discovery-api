import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const compareColleges = async (
  req: Request,
  res: Response
) => {
  try {
    const { collegeIds } = req.body;

    const colleges = await prisma.college.findMany({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};