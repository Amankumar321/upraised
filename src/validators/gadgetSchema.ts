import { z } from "zod";
import { Status } from "@prisma/client"; // Import Prisma Status Enum


// Validator for the GET /gadgets route (query validation for status filter)
export const getGadgetsValidator = z.object({
  query: z.object({
    // Optional status filter for retrieving gadgets by status
    status: z.nativeEnum(Status).optional(), // Status is optional for update, but if provided, it must be a valid status
  }),
});


// Validator for the POST /gadgets route (body validation for name)
export const createGadgetValidator = z.object({
  body: z.object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters long")
      .optional(), // Name is optional for update, but if provided, it must meet the length condition
  }),
});


export const updateGadgetValidator = z.object({
  params: z.object({
    id: z
      .string()
      .uuid("Invalid UUID format"),
  }),
  body: z.object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters long")
      .optional(), // Name is optional for update, but if provided, it must meet the length condition
    status: z
      .nativeEnum(Status, {
        invalid_type_error: "Status must be one of the valid values",
      })
      .optional(), // Status is optional for update, but if provided, it must be a valid status
  }).partial(), // Allow partial updates (name, status can be updated independently)
});


// Validator for the POST /gadgets/:id/self-destruct route (params validation for id)
export const selfDestructGadgetValidator = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "ID is required",
      })
      .uuid("Invalid UUID format"),
  }),
});


// Validator for the DELETE /gadgets/:id/decommission route (params validation for id)
export const decommissionGadgetValidator = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "ID is required",
      })
      .uuid("Invalid UUID format"),
  }),
});
