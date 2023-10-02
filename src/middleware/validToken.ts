import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  user: any; // Replace 'any' with the actual type of your user object
}

// Extend the Request interface to include a 'user' property
interface CustomRequest extends Request {
  user?: DecodedUser;
}

const validateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (
    authHeader &&
    typeof authHeader === "string" &&
    authHeader.startsWith("Bearer")
  ) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as DecodedUser;
      req.user = decoded.user; // Now TypeScript recognizes 'user' property on 'req'
      next();
    } catch (err) {
      return res.json({ error: "User is not authorized" });
    }
  }

  if (!token) {
    return res.json({ error: "User is not authorized" });
  }
};

export default validateToken;
