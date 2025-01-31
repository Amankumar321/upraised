import { z } from "zod";

// Validator for user auth (username and password)
export const authValidator = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username must not exceed 30 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .nonempty("Username is required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters")
      .nonempty("Password is required"),
  }),
});