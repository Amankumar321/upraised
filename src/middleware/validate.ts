import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate request body, query, and params
 * @param validator - The Zod validation schema to use
 */
export const validateRequest =
  (validator: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the request body, query, and params using the validator schema
      await validator.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Validation passed, proceed to next middleware
      next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        res.status(400).json({ msg: error.issues[0].message });
        return;
      }

      // Handle general server errors
      res.status(500).json({ msg: "Internal Error" });
      return;
    }
  };
