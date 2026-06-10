import { Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const saveCollege = async (
  req: AuthRequest,
  res: Response
) => {
  const collegeId = Number(req.params.collegeId);

  const saved = await prisma.savedCollege.create({
    data: {
      userId: req.userId!,
      collegeId
    }
  });

  res.status(201).json({
    success: true,
    data: saved
  });
};

export const getSavedColleges = async (
  req: AuthRequest,
  res: Response
) => {
  const colleges = await prisma.savedCollege.findMany({
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

export const removeSavedCollege = async (
  req: AuthRequest,
  res: Response
) => {
  const collegeId = Number(req.params.collegeId);

  await prisma.savedCollege.delete({
    where: {
      userId_collegeId: {
        userId: req.userId!,
        collegeId
      }
    }
  });

  res.json({
    success: true,
    message: "College removed"
  });
};