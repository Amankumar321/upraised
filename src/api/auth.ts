import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma"; // Import Prisma client
import bcrypt from "bcryptjs";

// Login functionality
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Check if user exists and password matches
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h", // Token expiry time
    });

    // Send the token as response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// Signup functionality
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ error: "Username is already taken" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};