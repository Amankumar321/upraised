import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  //Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    // Authentication passed, proceed to next middleware
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};
