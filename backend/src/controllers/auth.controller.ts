import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const existing =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

    const token =
      generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token =
      generateToken(user.id);

    res.json({
      success: true,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const profile = async (
  req: AuthRequest,
  res: Response
) => {
  const user =
    await prisma.user.findUnique({
      where: {
        id: req.userId
      }
    });

  res.json({
    success: true,
    user
  });
};