import { Request, Response } from "express";
import adminModel from "../model/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json("All field must be provided");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res
        .status(500)
        .json({ error: "Access token secret is not defined" });
    }
    const admin = await adminModel.findOne({ email: email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const accessToken = jwt.sign(
        {
          admin: {
            email: admin.email,
            id: admin._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );

      res.status(200).json({ status: "success", accessToken });
    } else {
      return res.json("Invalid password");
    }
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await adminModel.create({
      email: email,
      password: hashPassword,
    });
    res.status(200).json({ status: "success" });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};
